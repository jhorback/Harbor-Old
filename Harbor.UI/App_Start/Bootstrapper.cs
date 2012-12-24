using System.Web.Mvc;

namespace Harbor.UI
{
	public static class Bootstrapper
	{
		public static void ExecuteTasks()
		{
			foreach (var task in DependencyResolver.Current.GetServices<IBootstrapperTask>())
				task.Execute();
		}
	}
}