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
		private readonly IUnitOfWork _unitOfWork;
		readonly HarborContext context;

		public UserRepository(IUnitOfWork unitOfWork)
		{
			_unitOfWork = unitOfWork;
			context = unitOfWork.Context;
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
			return user;
		}

		public User Update(User entity)
		{
			DomainObjectValidator.ThrowIfInvalid(entity);
			throwIfLastEnabledSysAdmin(entity);

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

			clearCachedUser(entity.UserName);
			return entity;
		}

		private void throwIfLastEnabledSysAdmin(User user)
		{
			var sysAdminKey = Domain.Security.Roles.SystemAdministrator.KEY;
			if (!(user.Enabled == false || user.DeletedUserRoles.Any(r => r.Role == sysAdminKey)))
				return;

			var enabledSysAdmins = FindAll(u => u.UserRoles.Any(r => r.Role == sysAdminKey) && u.Enabled);
			//var roles = context.UserRoles.Where(r => r.Role == sysAdminKey);
			//if (roles.Count() <= 1 && roles.Count(r => r.UserName.ToLower() == user.UserName.ToLower()) > 0)
			if (!enabledSysAdmins.Any())
			{
				throw new DomainValidationException("There must be at least one enabled system administrator.");
			}
		}

		public void Delete(User entity)
		{
			var usersContentDir = File.UsersFolderPhysicalPath() + entity.UserName;
			if (System.IO.Directory.Exists(usersContentDir))
				System.IO.Directory.Delete(usersContentDir, recursive: true);

			
			// jch* - without deleting files, should have an error if one has been added.

			context.Users.Remove(entity);
			clearCachedUser(entity.UserName);
		}

		public void Save()
		{
			_unitOfWork.Save();
		}
		#endregion


		#region IUserRepository
		public User FindUserByName(string userName)
		{
			return FindById(userName, readOnly: true);
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
