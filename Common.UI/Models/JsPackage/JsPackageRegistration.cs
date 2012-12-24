
namespace Common.UI.Models
{
	public abstract class JsPackageRegistration
	{
		/// <summary>
		/// The name of the package.
		/// This needs to match the folder name in the /Scripts/ folder where the package resides.
		/// </summary>
		public abstract string Name { get; }

		/// <summary>
		/// The package description.
		/// </summary>
		public abstract string Description { get; }

		/// <summary>
		/// Override this method to provide for other configuration options such as script dependencies.
		/// </summary>
		/// <param name="config"></param>
		public abstract void ConfigureJsPackage(JsPackageConfig config);
	}
}