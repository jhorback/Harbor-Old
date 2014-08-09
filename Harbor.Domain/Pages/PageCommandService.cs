using System;
using System.Collections.Generic;
using System.Linq;

namespace Harbor.Domain.Pages
{
	public class PageCommandService : IPageCommandService
	{
		private readonly ReflectionUtils _reflectionUtils;
		private readonly ILogger _logger;
		private readonly IObjectFactory _objectFactory;
		private readonly Dictionary<string, Type> handlers = new Dictionary<string, Type>();
		

		public PageCommandService(ReflectionUtils reflectionUtils, ILogger logger, IObjectFactory objectFactory)
		{
			_reflectionUtils = reflectionUtils;
			_logger = logger;
			_objectFactory = objectFactory;

			findHandlers();
		}

		void findHandlers()
		{
			var commandHandlers = _reflectionUtils.FindTypesImplementingInterface(typeof(IPageCommandHandler));
			foreach (var handler in commandHandlers)
			{
				var types = _reflectionUtils.GetTypeParameters(handler, typeof(IPageCommandHandler<>));
				if (types == null)
				{
					_logger.Warn("A page command handler did not implement a generic type. Handler type: {0}", handler.Name);
					continue;
				}

				var type = types.FirstOrDefault();
				if (type == null)
				{
					_logger.Warn("A page command handler did not implement a generic type. Handler type: {0}", handler.Name);
					continue;
				}

				handlers.Add(type.Name.ToLower(), handler);
			}
		}

		public void Execute(IPageCommand command)
		{
			var commandName = command.GetType().Name.ToLower();
			var handler = handlers.ContainsKey(commandName) ? handlers[commandName] : null;
			if (handler != null)
			{
				var handlerInstance = _objectFactory.GetInstance(handler);
				try
				{
					_reflectionUtils.InvokeMethod(handlerInstance, "Execute", new[] { command });
				}
				catch (Exception e)
				{
					_logger.Error(e);
				}
			}
		}
	}
}
