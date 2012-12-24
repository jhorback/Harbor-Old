using System.Collections.Generic;
using Harbor.Domain.Security;

namespace  Harbor.Domain.Security.Roles
{
	public class FileUploader : UserFunctionalRole
	{
		public const string KEY = "FileUploader";
		public override string Key { get { return FileUploader.KEY; } }
		public override string Name { get { return "File Uploader"; } }
		public override string Description { get { return "Can upload and manage files."; } }
		public override IEnumerable<FunctionalPermissions<UserFunctionalArea>> FunctionalPermissions
		{
			get
			{
				return new List<UserPermissions>
					{
						new UserPermissions(UserFunctionalArea.Files, Permissions.All)
					};
			}
		}
	}
}