using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;
using System.Text;
using Harbor.Domain.Security;

namespace Harbor.Domain.Files
{
	public class File : IAggregateRoot
	{
		#region static
		public static string TodaysAlbumName()
		{
			return DateTime.Now.ToShortDateString();
		}

		/// <summary>
		/// Returns the physical path to the /App_Data/users/ folder.
		/// </summary>
		/// <returns></returns>
		public static string UsersFolderPhysicalPath()
		{
			string path;
			var appDataDir = AppDomain.CurrentDomain.GetData("DataDirectory");
			if (appDataDir != null)
				path = appDataDir.ToString();
			else path = AppDomain.CurrentDomain.BaseDirectory;
			return path + "/users/";
		}

		public const int LOWRES = 250;
		public const int HIGHRES = 1000;
		#endregion

		#region ctor
		public File() : this(null, null) { }

		public File(string userName, string fileName)
		{
			UserName = userName;
			Name = fileName;
			Ext =  Path.GetExtension(fileName);
			FileID = Guid.NewGuid();
			Uploaded = DateTime.Now;
			Modified = DateTime.Now;
			Album = File.TodaysAlbumName();
			Public = true;
			ResolutionsCreated = FileResolution.Original;
		}
		#endregion

		#region properties
		[Key]
		public Guid FileID { get; set; }
		
		/// <summary>
		/// The UserName of the person who uploaded the file.
		/// </summary>
		[Required]
		[StringLength(50)]
		public string UserName { get; set; }

		[StringLength(100)]
		public string Album { get; set; }

		[Required]
		[StringLength(100)]
		public string Name { get; set; }

		[Required]
		[StringLength(150)]
		public string ContentType { get; set; }

		[Required]
		[StringLength(6)]
		public string Ext { get; set; }

		[StringLength(250)]
		public string Description { get; set; }

		[DefaultValue(true)]
		public bool Public { get; set; }
		
		/// <summary>
		/// The date the file was uploaded.
		/// </summary>
		[Required]
		public DateTime Uploaded { get; set; }
		
		/// <summary>
		/// The date any part of the file was last modified.
		/// </summary>
		[Required]
		public DateTime Modified { get; set; }
		
		/// <summary>
		/// The size in bytes of the original file.
		/// </summary>
		public long Size { get; set; }
		
		/// <summary>
		/// The total size in bytes if multiple versions exist (e.g. low/medium resolutions).
		/// </summary>
		public long TotalSize { get; set; }


		/// <summary>
		/// For database persistance of ResolutionsCreated (until .NET 4.5 which can handle enums).
		/// </summary>
		public int Resolutions
		{
			get { return (int)ResolutionsCreated; }
			set { ResolutionsCreated = (FileResolution)(value); }
		}

		/// <summary>
		/// Keeps track of the versions of the file created on disk.
		/// </summary>
		public FileResolution ResolutionsCreated { get; set; }
		#endregion

		#region associations
		public User Owner { get; set; }
		#endregion

		#region methods

		/// <summary>
		/// Returns the path to the specified resolution of the file in the form of:
		/// c:/.../App_Data/users/[username]/[id]-[res].ext
		/// Only returns the -low and -high res paths if ResolutionsCreated indicates the file exists.
		/// </summary>
		/// <param name="resolution"> </param>
		/// <param name="max">Uses the number to determine the best resolution (takes precidence over resolution).</param>
		/// <returns></returns>
		/// <exception cref="InvalidOperationException">If no UserName or Name.</exception>
		public string GetPhysicalPath(FileResolution resolution = FileResolution.Original, int? max = null)
		{
			if (string.IsNullOrEmpty(UserName) || string.IsNullOrEmpty(Name))
				throw new InvalidOperationException("A File needs an owner and name to determine it's path.");

			if (max <= HIGHRES && max > LOWRES)
			{
				resolution = FileResolution.High;
			}
			else if (max <= LOWRES)
			{
				resolution = FileResolution.Low;
			}

			var usersFolder = UsersFolderPhysicalPath() + UserName + "/";
			var res = "";
			if (resolution == FileResolution.Low && ResolutionsCreated.HasFlag(FileResolution.Low))
			{
				res = "-low";
			}
			else if (resolution == FileResolution.High && ResolutionsCreated.HasFlag(FileResolution.High))
			{
				res = "-high";
			}

			var path = string.Format("{0}{1}{2}{3}", usersFolder, FileID, res, Ext);
			return path;
		}

		public bool HasPermission(string userName, Permissions permission)
		{
			if ((permission.IsRequesting(Permissions.Create) ||
					permission.IsRequesting(Permissions.Update) ||
					permission.IsRequesting(Permissions.Delete)
				) && IsOwner(userName))
				return true;

			if (permission.IsRequesting(Permissions.Read) &&
				(this.Public || IsOwner(userName)))
				return true;

			return false;
		}

		public bool IsOwner (string userName)
		{
			return userName.ToLower() == this.UserName.ToLower();
		}

		public bool IsBitmap()
		{
			return BitmapExtensions.Contains( Ext.ToLower());
		}

		public static string[] BitmapExtensions = new string[] { ".bmp", ".gif", ".exif", ".jpg", ".png", ".tiff" };
		#endregion
	}
}
