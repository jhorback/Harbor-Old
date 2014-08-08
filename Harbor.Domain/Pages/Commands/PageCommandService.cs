using System.Collections.Generic;

namespace Harbor.Domain.Pages
{
	public class PageCommandService : IPageCommandService
	{
		private readonly Dictionary<string, object> handlers = new Dictionary<string, object>();
		// handlers may be handlerTypes
		// then have a handlers cache
		// look in cache first if not found create from handlerTypes.


		public PageCommandService()
		{

		}

		public void Execute(IPageCommand command)
		{
			var commandName = command.GetType().Name.ToLower();
			var handler = handlers.ContainsKey(commandName) ? handlers[commandName] : null;
			if (handler != null)
			{
				// handler.Execute(command);
			}
		}
	}
}
