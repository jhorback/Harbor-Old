using System.Web.Mvc;
using Common.UI.Models;

namespace Common.UI.Controllers
{
    public class TestsController : Controller
    {
		IJsPackageRepository packageRep;

    	public TestsController()
			: this(new JsPackageRepository()) {}

		public TestsController(IJsPackageRepository packageRep)
		{
			this.packageRep = packageRep;
		}

        public ViewResult Index()
        {
        	var model = packageRep.GetAllPackages();
            return View("Index", model);
        }

		public ViewResult Test(string name)
		{
			var model = packageRep.GetPackage(name);
			return View("Test", model);
		}
    }
}
