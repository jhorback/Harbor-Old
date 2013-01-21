using System.IO;
using System.Web;
using System.Web.Optimization;
using Harbor.UI.Models.JSPM;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using Microsoft.VisualStudio.TestTools.UnitTesting.Web;
using System.Web.Mvc;

namespace Harbor.UI.Tests
{


	[TestClass()]
	public class JavaScriptPackageViewerTest
	{


		private TestContext testContextInstance;

		public TestContext TestContext
		{
			get
			{
				return testContextInstance;
			}
			set
			{
				testContextInstance = value;
			}
		}

		#region Additional test attributes
		// 
		//You can use the following additional attributes as you write your tests:
		//
		// Use ClassInitialize to run code before running the first test in the class
		[ClassInitialize()]
		public static void MyClassInitialize(TestContext testContext)
		{
			HttpContext.Current = new HttpContext(
				new HttpRequest("", "http://tempuri.org", ""),
				new HttpResponse(new StringWriter()));
			BundleTable.MapPathMethod = MapPathMethod;
		}
		//
		//Use ClassCleanup to run code after all tests in a class have run
		//[ClassCleanup()]
		//public static void MyClassCleanup()
		//{
		//}
		//
		//Use TestInitialize to run code before running each test
		//[TestInitialize()]
		//public void MyTestInitialize()
		//{
		//}
		//
		//Use TestCleanup to run code after each test has run
		//[TestCleanup()]
		//public void MyTestCleanup()
		//{
		//}
		//

		class mockPackage : JavaScriptPackage
		{
			public mockPackage()
			{
				Name = "Test";
				ScriptBundle = new ScriptBundle("~/test.js").Include("~/test1.js").Include("~/test2.js");
				StyleBundle = new StyleBundle("~/test.css").Include("~/test1.css").Include("~/test2.css");
			}
		}

		static string MapPathMethod(string item)
		{
			return item;
		}
		#endregion
		

		[TestMethod]
		public void ExtractScripts_ScriptsOnly_ScriptsExtracted()
		{
			
			//var viewer = new JavaScriptPackageViewer(new mockPackage());
			//var scripts = viewer.GetScripts();
			//Assert.AreEqual(scripts.Length, 2);
			//Assert.AreEqual(scripts[0], "/test1.js");
			//Assert.AreEqual(scripts[1], "/test2.js");
		}

		[TestMethod]
		public void ExtractStyles_StylesOnly_StylesExtracted()
		{
			//var source = "<div></div>\r\n<link href=\"/Content/site/core/foundation.css\" rel=\"stylesheet\"/>\r\n<link href=\"/Content/site/core/button.css\" rel=\"stylesheet\"/>\r\n";
			//var styles = JavaScriptPackageViewer.ExtractStyles(source);
			//Assert.AreEqual(styles.Length, 2);
			//Assert.AreEqual(styles[0], "/Content/site/core/foundation.css");
			//Assert.AreEqual(styles[1], "/Content/site/core/button.css");
		}

		[TestMethod]
		public void ExtractScripts_ScriptsAndStyles_ScriptsExtracted()
		{
			//var source = "<script src=\"/Scripts/Apps/Settings/Settings.js\"></script>\r\n<script src=\"/Scripts/Apps/Settings/AppSettings.js\"></script>\r\n<script src=\"/Scripts/Apps/Settings/EditNameView.js\"></script>\r\n<script src=\"/Scripts/Apps/Settings/EditNavView.js\"></script>\r\n<script src=\"/Scripts/Apps/Settings/MainView.js\"></script>\r\n" +
			//    "<div></div>\r\n<link href=\"/Content/site/core/foundation.css\" rel=\"stylesheet\"/>\r\n<link href=\"/Content/site/core/button.css\" rel=\"stylesheet\"/>\r\n";
			
			//var scripts = JavaScriptPackageViewer.ExtractScripts(source);
			//Assert.AreEqual(scripts.Length, 5);
			//Assert.AreEqual(scripts[0], "/Scripts/Apps/Settings/Settings.js");
			//Assert.AreEqual(scripts[4], "/Scripts/Apps/Settings/MainView.js");
		}

		[TestMethod]
		public void ExtractStyles_StylesAndScripts_StylesExtracted()
		{
			//var source = "<script src=\"/Scripts/Apps/Settings/Settings.js\"></script>\r\n<script src=\"/Scripts/Apps/Settings/AppSettings.js\"></script>\r\n<script src=\"/Scripts/Apps/Settings/EditNameView.js\"></script>\r\n<script src=\"/Scripts/Apps/Settings/EditNavView.js\"></script>\r\n<script src=\"/Scripts/Apps/Settings/MainView.js\"></script>\r\n" +
			//    "<div></div>\r\n<link href=\"/Content/site/core/foundation.css\" rel=\"stylesheet\"/>\r\n<link href=\"/Content/site/core/button.css\" rel=\"stylesheet\"/>\r\n";
			//var styles = JavaScriptPackageViewer.ExtractStyles(source);
			//Assert.AreEqual(styles.Length, 2);
			//Assert.AreEqual(styles[0], "/Content/site/core/foundation.css");
			//Assert.AreEqual(styles[1], "/Content/site/core/button.css");
		}
	}
}
