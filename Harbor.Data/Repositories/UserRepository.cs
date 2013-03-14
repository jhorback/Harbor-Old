using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Caching;
using System.Text;
using Harbor.Domain;
using Harbor.Domain.Files;
using Harbor.Domain.Security;

namespace Harbor.Data.Repositories
{
	public class UserRepository : IUserRepository
	{
		HarborContext context;

		public UserRepository(HarborContext context)
		{
			this.context = context;
		}

		#region IRepository
		public IEnumerable<User> FindAll(Func<User, bool> filter)
		{
			return filter == null ?
				context.Users
					.Include("UserRoles")
				// .Include("UserSettings") user settings not a navigation property? jch* need to update navigation property?
					.ToList()
				:
				context.Users
					.Include("UserRoles")
				// .Include("UserSettings")
					.Where(filter).ToList();
		}

		public IQueryable<User> Query()
		{
			context.Configuration.ProxyCreationEnabled = false;
			return context.Users.Where(d => d.Enabled == true).AsQueryable();
		}

		public User FindById(object id)
		{
			return FindById(id, readOnly: true);
		}

		public User FindById(object id, bool readOnly)
		{
			var username = id as string;
			if (readOnly)
				return findCachedUser(username);
			return findUser(username);
		}

		/// <summary>
		/// 
		/// </summary>
		/// <param name="entity"></param>
		/// <returns></returns>
		/// <throws><see cref="DomainValidationException"/> if the user already exists.</throws>
		public User Create(User entity)
		{
			DomainObjectValidator.ThrowIfInvalid(entity);
			
			if ( exists(entity.UserName))
				throw new DomainValidationException("The user already exists.");

			var user = context.Users.Add(entity);
			context.SaveChanges();
			return user;
		}

		public User Update(User entity)
		{
			DomainObjectValidator.ThrowIfInvalid(entity);
			throwIfLastEnabledSysAdmin(entity);

			var entry = context.Entry(entity);
			if (entry.State == System.Data.EntityState.Detached)
			{
				throw new Exception("The entity was in a detached state.");
			}

			// remove roles
			foreach (var userRole in entity.DeletedUserRoles)
			{
				context.UserRoles.Remove(userRole);
			}
			entity.DeletedUserRoles = new List<UserRole>();

			// remove settings
			foreach (var setting in entity.DeletedUserSettings)
			{
				context.UserSettings.Remove(setting);
			}
			entity.DeletedUserSettings = new List<UserSetting>();

			context.SaveChanges();
			clearCachedUser(entity.UserName);
			return entity;
		}

		private void throwIfLastEnabledSysAdmin(User user)
		{
			var sysAdminKey = Domain.Security.Roles.SystemAdministrator.KEY;
			if (!(user.Enabled == false || user.DeletedUserRoles.Any(r => r.Role == sysAdminKey)))
				return;

			var enabledSysAdmins = FindAll(u => u.UserRoles.Any(r => r.Role == sysAdminKey));
			var roles = context.UserRoles.Where(r => r.Role == sysAdminKey);
			if (roles.Count() <= 1 && roles.Count(r => r.UserName.ToLower() == user.UserName.ToLower()) > 0)
			{
				throw new DomainValidationException("There must be at least one enabled system administrator.");
			}
		}

		public void Delete(User entity)
		{
			var usersContentDir = File.UsersFolderPhysicalPath() + entity.UserName;
			if (System.IO.Directory.Exists(usersContentDir))
				System.IO.Directory.Delete(usersContentDir, recursive: true);

			if (context.Entry(entity).State == System.Data.EntityState.Detached)
			{
				throw new Exception("The entity was in a detached state.");
			}
			context.Users.Remove(entity);
			context.SaveChanges();
			clearCachedUser(entity.UserName);
		}
		#endregion


		#region IUserRepository
		public User FindUserByName(string userName)
		{
			return FindById(userName);
		}

		public User FindUserByName(string userName, bool readOnly)
		{
			return FindById(userName, readOnly);
		}

		private bool exists(string username)
		{
			return this.FindUserByName(username) != null;
		}
		#endregion

		#region caching
		string pageCacheKey = "Harbor.Data.Repositories.UserRepository.";

		void clearCachedUser(string username)
		{
			var cacheKey = pageCacheKey + username;
			MemoryCache.Default.Remove(cacheKey);
		}

		User findCachedUser(string username)
		{
			var cacheKey = pageCacheKey + username;
			var user = MemoryCache.Default.Get(cacheKey) as User;
			if (user == null)
			{
				user = findUser(username);
				if (user != null)
				{
					MemoryCache.Default.Set(cacheKey, user, DateTime.Now.AddSeconds(10));
				}
			}
			return user;
		}

		User findUser(string username)
		{
			if (username == null)
				return null;

			var user = FindAll(u => u.UserName.ToLower() == username.ToLower()).FirstOrDefault();
			if (user == null)
				return null;

			user.AllUserRoles = new UserFeatureRoleRepository().GetUserRoles();
			return user;
		}
		#endregion
	}
}
