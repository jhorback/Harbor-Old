using System.Web.Mvc;
using Common.UI.Models;

namespace Common.UI.Controllers
{
    public class PackagesController : Controller
    {
		IJsPackageRepository packageRep;

    	public PackagesController()
			: this(new JsPackageRepository()) {}

		public PackagesController(IJsPackageRepository packageRep)
		{
			this.packageRep = packageRep;
		}

        public ViewResult Index()
        {
        	var model = packageRep.GetAllPackages();
            return View("Index", model);
        }

		public ViewResult Package(string name)
		{
			var model = packageRep.GetPackage(name);
			return View("Package", model);
		}
    }
}
