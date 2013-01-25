using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Cryptography;
using System.Web.Security;
using Harbor.Domain.DataAnnotations;

namespace Harbor.Domain.Security
{
	public class User : IAggregateRoot
	{
		#region ctor
		public User()
		{
			this.UserSettings = new List<UserSetting>();
			this.UserRoles = new List<UserRole>();
			this.DeletedUserRoles = new List<UserRole>();
			this.DeletedUserSettings = new List<UserSetting>();
			this.AllUserRoles = new List<UserFeatureRole>();
			this.Created = DateTime.Now;
			this.Enabled = true;
		}
		#endregion

		#region properties
		[Key]
		[Required]
		[StringLength(50)]
		[Display(Name="Username")]
		public string UserName { get; set; }
		
		/// <summary>
		/// The encrypted password.
		/// </summary>
		[StringLength(48, MinimumLength = 48)]
		public string Password { get; set; }
		
		[Required]
		[StringLength(50)]
		[Display(Name="First name")]
		public string FirstName { get; set; }

		[StringLength(50)]
		[Display(Name="Middle name")]
		public string MiddleName { get; set; }

		[StringLength(50)]
		[Display(Name = "Last name")]
		public string LastName { get; set; }

		public string DisplayName
		{
			get
			{
				var fm = string.Format("{0} {1}", FirstName, MiddleName).Trim();
				return string.Format("{0} {1}", fm, LastName).Trim();
			}
		}
		
		[Email]
		[StringLength(150)]
		public string Email { get; set; }
		
		public DateTime Created { get; set; }
		
		public DateTime? LastLogin { get; set; }
		
		public DateTime? LastActivity { get; set; }
	

		[DefaultValue(true)]
		public bool Enabled { get; set; }
		#endregion


		#region child entities
		internal virtual ICollection<UserSetting> UserSettings { get; set; }
		internal List<UserSetting> DeletedUserSettings { get; set; } 

		internal virtual ICollection<UserRole> UserRoles { get; set; }
		internal List<UserRole> DeletedUserRoles { get; set; }

		/// <summary>
		/// All roles available to the user authorization scope.
		/// To be populated by the user factory.
		/// </summary>
		internal IEnumerable<UserFeatureRole> AllUserRoles { get; set; }
		#endregion


		#region methods
		public bool Authenticate(string password)
		{
			return IsPasswordValid(password);
		}

		public bool IsPasswordValid(string password)
		{
			return passwordsMatch(password);
		}

		/// <summary>
		/// The password will be encrypted and set as the Password property.
		/// </summary>
		/// <param name="password"></param>
		public void SetPassword(string password)
		{
			Password = createPassword(password);
		}

		public bool HasPermission(UserFeature feature, Permissions permission)
		{
			if (!Enabled) return false;
			if (permissionsChecker == null)
				permissionsChecker = new PermissionsChecker<UserFeature>(AllUserRoles, UserRoles);
			return permissionsChecker.HasPermission(feature, permission);
		}

		public string[] GetRoles()
		{
			return UserRoles.Select(r => r.Role).ToArray();
		}

		/// <summary>
		/// Clears all roles and adds the roles specified by the roles array.
		/// </summary>
		/// <param name="roles"></param>
		public void SetRoles(string[] roles)
		{
			var toRemove = UserRoles.Where(ur => roles.Contains(ur.Role) == false).ToList();
			foreach (var role in toRemove)
			{
				DeletedUserRoles.Add(role);
				UserRoles.Remove(role);
			}

			foreach (var role in roles)
			{
				var actualRole = AllUserRoles.FirstOrDefault(r => r.Key.ToLower() == role.ToLower());
				if (actualRole == null)
					continue;

				if (UserRoles.FirstOrDefault(r => r.Role == actualRole.Key) == null)
				{
					this.UserRoles.Add(new UserRole
					                   	{
					                   		UserName = this.UserName,
					                   		Role = actualRole.Key
					                   	});
				}
			}
		}

		public bool HasRole(string role)
		{
			if (role == null)
				return true;

			var actualRole = AllUserRoles.FirstOrDefault(r => r.Key.ToLower() == role.ToLower());
			if (actualRole == null)
				return false;

			var grantedRole = UserRoles.FirstOrDefault(a => a.Role == actualRole.Key);
			return grantedRole != null;
		}


		public string GetSetting(string name)
		{
			var setting = UserSettings.FirstOrDefault(p => string.Compare(name, p.Name, true) == 0);
			return setting.Value;
		}

		public void SetSetting(string name, string value)
		{
			var setting = UserSettings.FirstOrDefault(p => string.Compare(name, p.Name, true) == 0);
			if (setting == null)
			{
				setting = new UserSetting
				{
					UserName = this.UserName,
					Name = name
				};
				UserSettings.Add(setting);
			}
			setting.Value = value;
		}


		public void DeleteSetting(string name)
		{
			var prop = UserSettings.FirstOrDefault(p => string.Compare(name, p.Name, true) == 0);
			if (prop != null)
			{
				this.DeletedUserSettings.Add(prop);
				this.UserSettings.Remove(prop);
			}
		}
		#endregion



		#region private
		PermissionsChecker<UserFeature> permissionsChecker = null;

		private bool passwordsMatch(string inputPassword)
		{
			// handles a null password
			if (Password == null)
			{
				if (string.IsNullOrEmpty(inputPassword))
					return true;
				else return false;
			}

			var dbPasswordAndSalt = Password;
			var dbSalt = dbPasswordAndSalt.Substring(0, 8);
			var testPassword = createPassword(inputPassword, dbSalt);
			if (testPassword == dbPasswordAndSalt
				|| (dbPasswordAndSalt.Trim() == "" && inputPassword == null)) // empty password
			{
				return true;
			}
			return false;
		}

		private static string createSalt(int size = 6)
		{
			var rng = new RNGCryptoServiceProvider();
			var buff = new byte[size];
			rng.GetBytes(buff);
			return Convert.ToBase64String(buff);
		}

		private static string createPassword(string password, string salt = null)
		{
			if (salt == null)
			{
				salt = createSalt();
			}

			var saltAndPwd = String.Concat(password, salt);
		
			var hashedPwd = FormsAuthentication.HashPasswordForStoringInConfigFile(saltAndPwd, "sha1");
			//var clearBytes = Encoding.UTF8.GetBytes(saltAndPwd);
			//var algorithm = new SHA1CryptoServiceProvider();
			//var hashedBytes = algorithm.ComputeHash(clearBytes);
			//var hashedPwd = Convert.ToBase64String(hashedBytes);

			return salt + hashedPwd;
		}
		#endregion
	}
}
