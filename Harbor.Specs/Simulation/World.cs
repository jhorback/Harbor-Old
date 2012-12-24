using System;
using System.Linq;
using TechTalk.SpecFlow;

namespace Harbor.Specs.Simulation
{
	[Binding]
	internal class World
	{
		private World()
		{
			// set up
		}

		private static World _world;
		internal static World Get
		{
			get
			{
				return _world;
			}
		}

		[BeforeScenario]
		private static void BeforeScenario()
		{
			_world = new World();
		}

		[AfterScenario]
		private static void AfterScenario()
		{
			_world = null;
		}


		//public TReturnType ExecuteControllerMethod<TReturnType, TController>(string methodName, params object[] methodParams)
		//{
		//    var types = methodParams.Select(x => x.GetType()).ToArray();
		//    var methodInfo = typeof(TController).GetMethod(methodName, types);
		//    var controllerInstance = Activator.CreateInstance<TController>();

		//    var httpActionContext = new System.Web.Http.Controllers.HttpActionContext();
		//    foreach (var attribute in methodInfo.GetCustomAttributes(true))
		//    {
		//        var authorizeActionFilterAttribute = attribute as AuthorizeActionFilterAttribute;
		//        if (authorizeActionFilterAttribute == null) continue;
		//        authorizeActionFilterAttribute.OnActionExecuting(httpActionContext);
		//    }

		//    var returnValue = (TReturnType)methodInfo.Invoke(controllerInstance, methodParams);

		//    var httpActionExecutedContext = new System.Web.Http.Filters.HttpActionExecutedContext();
		//    foreach (var attribute in methodInfo.GetCustomAttributes(true))
		//    {
		//        var authorizeActionFilterAttribute = attribute as AuthorizeActionFilterAttribute;
		//        if (authorizeActionFilterAttribute == null) continue;
		//        authorizeActionFilterAttribute.OnActionExecuted(new HttpActionExecutedContext());
		//    }


		//    return returnValue;
		//}
	}
}
