using System;
using System.Web;
using System.Web.Routing;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using MvcRouteTester;

namespace Harbor.UI.Tests
{
	[Ignore] // jch* need to figure out how the constraints work with the route tester
	[TestClass()]
	public class RouteConfigTest
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
		//Use ClassInitialize to run code before running the first test in the class
		//[ClassInitialize()]
		//public static void MyClassInitialize(TestContext testContext)
		//{
		//}
		//
		//Use ClassCleanup to run code after all tests in a class have run
		//[ClassCleanup()]
		//public static void MyClassCleanup()
		//{
		//}
		
		//Use TestInitialize to run code before running each test
		[TestInitialize()]
		public void MyTestInitialize()
		{
			Routes = new RouteCollection();
			RouteConfig.RegisterRoutes(Routes);
			Routes.MapAttributeRoutesInAssembly(typeof(HarborApplication));
		}

		public RouteCollection Routes { get; set; }
		
		//Use TestCleanup to run code after each test has run
		[TestCleanup()]
		public void MyTestCleanup()
		{
			Routes = null;
		}
		
		#endregion


		[TestMethod]
		public void RegisterRoutes_UsersApi_RouteDataMatches()
		{
			var routes = new RouteCollection();
			RouteConfig.RegisterRoutes(routes);
			// Routes.ShouldMap("/api/users/jbond").To<UsersController>(HttpMethod.Get, c => c.Get("jbond"));
			RouteAssert.HasRoute(routes, "/api/users/jbond", new
			{
				controller = "users",
				userName = "jbond"
			});
			//RouteAssert.HasApiRoute()

			//AssertRoute(routes, "~/api/users/jbond", new
			//{
			//	controller = "users",
			//	userName = "jbond"
			//});
		}

		[TestMethod]
		public void RegisterRoutes_SettingsApi_RouteDataMatches()
		{
			var routes = new RouteCollection();
			RouteConfig.RegisterRoutes(routes);

			AssertRoute(routes, "~/api/settings/settingName", new
			{
				controller = "Settings",
				name = "settingName"
			});
		}

		[TestMethod]
		public void RegisterRoutes_DefaultApi_RouteDataMatches()
		{
			var routes = new RouteCollection();
			RouteConfig.RegisterRoutes(routes);

			AssertRoute(routes, "~/api/someController/someID", new
			{
				controller = "someController",
				id = "someID"
			});
		}


		[TestMethod]
		public void RegisterRoutes_DefaultApi_PageRouteDataMatches()
		{
			var routes = new RouteCollection();
			RouteConfig.RegisterRoutes(routes);

			AssertRoute(routes, "~/api/pages/10", new
			{
				controller = "pages",
				id = "10"
			});
		}

		[TestMethod]
		public void RegisterRoutes_404_RouteDataMatches()
		{
			var routes = new RouteCollection();
			RouteConfig.RegisterRoutes(routes);

			AssertRoute(routes, "~/404/the/rest/of/the/path", new
			{
				controller = "Home",
				action = "404",
				aspxerrorpath = "the/rest/of/the/path"
			});
		}


		[TestMethod]
		public void RegisterRoutes_Error_RouteDataMatches()
		{
			var routes = new RouteCollection();
			RouteConfig.RegisterRoutes(routes);

			AssertRoute(routes, "~/Error", new
			{
				controller = "Home",
				action = "Error"
			});
		}

		[TestMethod]
		public void RegisterRoutes_Page_RouteDataMatches()
		{
			var routes = new RouteCollection();
			RouteConfig.RegisterRoutes(routes);

			AssertRoute(routes, "~/id/123/this-is-the-title", new
			{
				controller = "User",
				action = "Page",
				id = "123",
				title = "this-is-the-title"
			});
		}

		[TestMethod]
		public void RegisterRoutes_StyleGuide_RouteDataMatches()
		{
			var routes = new RouteCollection();
			RouteConfig.RegisterRoutes(routes);

			AssertRoute(routes, "~/StyleGuide/Page Title", new
			{
				controller = "StyleGuide",
				action = "index",
				pageKey = "Page Title"
			});
		}

		[TestMethod]
		public void RegisterRoutes_StyleGuideDefault_RouteDataMatches()
		{
			var routes = new RouteCollection();
			RouteConfig.RegisterRoutes(routes);

			AssertRoute(routes, "~/StyleGuide", new
			{
				controller = "StyleGuide",
				action = "index",
				pageKey = "Home"
			});
		}


		[TestMethod]
		public void RegisterRoutes_JST_RouteDataMatches()
		{
			var routes = new RouteCollection();
			RouteConfig.RegisterRoutes(routes);

			AssertRoute(routes, "~/JST/path/of/the/template", new
			{
				controller = "Home",
				action = "JST",
				viewpath = "path/of/the/template"
			});
		}

		[TestMethod]
		public void RegisterRoutes_Default_RouteDataMatches()
		{
			var routes = new RouteCollection();
			RouteConfig.RegisterRoutes(routes);

			AssertRoute(routes, "~/someController/someAction/path/info", new
			{
				controller = "somecontroller",
				action = "someaction",
				pathinfo = "path/info"
			});
		}

		[TestMethod]
		public void RegisterRoutes_DefaultDefault_RouteDataMatches()
		{
			var routes = new RouteCollection();
			RouteConfig.RegisterRoutes(routes);

			AssertRoute(routes, "~/", new
			{
				controller = "Home",
				action = "Index"
			});
		}


		[TestMethod]
		public void RegisterRoutes_File_RouteDataMatches()
		{
			var routes = new RouteCollection();
			RouteConfig.RegisterRoutes(routes);

			AssertRoute(routes, "~/file/12.jpg", new
			{
				controller = "User",
				action = "Download",
				id = "12",
				ext = "jpg"
			});
		}

		//[TestMethod]
		//public void RegisterRoutes_FileWithRes_RouteDataMatches()
		//{
		//    var routes = new RouteCollection();
		//    RouteConfig.RegisterRoutes(routes);

		//    AssertRoute(routes, "~/file/12.jpg?res=low", new
		//    {
		//        controller = "User",
		//        action = "Download",
		//        id = "12",
		//        ext = "jpg", // why does test fail - ext = jpg?res=low
		//        res = "low"
		//    });
		//}

		[TestMethod]
		public void RegisterRoutes_FileWithName_RouteDataMatches()
		{
			var routes = new RouteCollection();
			RouteConfig.RegisterRoutes(routes);

			AssertRoute(routes, "~/file/12/name-of-file.jpg", new
			{
				controller = "User",
				action = "Download",
				id = "12",
				name = "name-of-file",
				ext = "jpg"
			});
		}


		/// <summary>
		/// Tests that a route will be parsed into the correct route values.
		/// </summary>
		/// <param name="routes">The route collection.</param>
		/// <param name="url">A virtual path to test.</param>
		/// <param name="expectations">The route values expected.</param>
		public static void AssertRoute(RouteCollection routes, string url, object expectations)
		{
			var httpContextMock = new Mock<HttpContextBase>();
			httpContextMock.Setup(c => c.Request.AppRelativeCurrentExecutionFilePath).Returns(url);

			RouteData routeData = routes.GetRouteData(httpContextMock.Object);
			Assert.IsNotNull(routeData, "Should have found the route");

			foreach (var kvp in new RouteValueDictionary(expectations))
			{
				var kvpEqualsRouteData = string.Equals(kvp.Value.ToString(),
					routeData.Values[kvp.Key].ToString(),
					StringComparison.OrdinalIgnoreCase);
				var assertMessage = string.Format("Expected '{0}', not '{1}' for '{2}'.",
					kvp.Value, routeData.Values[kvp.Key], kvp.Key);
				Assert.AreEqual(true, kvpEqualsRouteData, assertMessage);
			}
		}
	}
}
