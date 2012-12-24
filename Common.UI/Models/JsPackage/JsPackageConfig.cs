
namespace Common.UI.Models
{
	public class JsPackageConfig
	{
		public JsPackage Package { get; set; }

		public JsPackageConfig(JsPackage package)
		{
			this.Package = package;
		}

		public JsPackageConfig AddDependency(string virtualPath)
		{
			this.Package.Dependencies.Add(virtualPath);
			return this;
		}
	}
}