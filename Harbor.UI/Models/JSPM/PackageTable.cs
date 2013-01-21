
namespace Harbor.UI.Models.JSPM
{
	public static class PackageTable
	{
		static PackageTable()
		{
			Packages = new PackageCollection();
		}

		public static PackageCollection Packages { get; private set; }
	}
}