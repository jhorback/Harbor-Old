using System;
using System.Collections.Generic;
using System.Linq;

namespace Harbor.Domain.Pages
{

	public interface ICommandContainerRepository
	{
		CommandContainer GetCommandContainer(Type handlerType, Type genericHandlerType);
	}

	public class CommandContainerRepository : ICommandContainerRepository
	{
		private readonly IObjectFactory _objectFactory;
		private readonly IMemCache _memCache;

		public CommandContainerRepository(IObjectFactory objectFactory, IMemCache memCache)
		{
			_objectFactory = objectFactory;
			_memCache = memCache;
		}

		public CommandContainer GetCommandContainer(Type handlerType, Type genericHandlerType)
		{
			var cacheKey = "CommandContainer:" + handlerType.FullName;
			var commandContainer = _memCache.GetGlobal<CommandContainer>(cacheKey);
			if (commandContainer == null)
			{
				commandContainer = _objectFactory.GetInstance<CommandContainer>();
				commandContainer.Initialize(handlerType, genericHandlerType);
				_memCache.SetGlobal<CommandContainer>(cacheKey, commandContainer, DateTime.Now.AddDays(1));
			}
			return commandContainer;
		}
	}

	public interface ICommand
	{
		
	}

	public class CommandContainer
	{
		private readonly ReflectionUtils _reflectionUtils;
		private readonly ILogger _logger;
		private readonly IObjectFactory _objectFactory;


		private readonly Dictionary<string, Type> handlers = new Dictionary<string, Type>();
		private readonly Dictionary<string, Type> commands = new Dictionary<string, Type>();

		public CommandContainer(ReflectionUtils reflectionUtils, ILogger logger, IObjectFactory objectFactory)
		{
			_reflectionUtils = reflectionUtils;
			_logger = logger;
			_objectFactory = objectFactory;
		}

		public void Initialize(Type handlerType, Type genericHandlerType)
		{
			var commandHandlers = _reflectionUtils.FindTypesImplementingInterface(handlerType);
			foreach (var commandHandler in commandHandlers)
			{
				var types = _reflectionUtils.GetTypeParameters(commandHandler, genericHandlerType);
				if (types == null)
				{
					_logger.Warn("A command handler did not implement a generic type. Handler type: {0}", commandHandler.Name);
					continue;
				}

				var commandType = types.FirstOrDefault();
				if (commandType == null)
				{
					_logger.Warn("A command handler did not implement a generic type. Handler type: {0}", commandHandler.Name);
					continue;
				}

				var commandKey = commandType.Name.ToLower();
				commands.Add(commandKey, commandType);
				handlers.Add(commandKey, commandHandler);
			}
		}

		public Type GetCommandType(string command)
		{
			var commandKey = command.ToLower();
			var commandType = commands.ContainsKey(commandKey) ? commands[commandKey] : null;
			return commandType;
		}

		public void Execute(ICommand command)
		{
			var commandName = command.GetType().Name.ToLower();
			var handler = handlers.ContainsKey(commandName) ? handlers[commandName] : null;
			if (handler != null)
			{
				var handlerInstance = _objectFactory.GetInstance(handler);
				try
				{
					_reflectionUtils.InvokeMethod(handlerInstance, "Execute", new object[] { command });
				}
				catch (Exception e)
				{
					_logger.Error(e);
					if (e.InnerException != null)
					{
						_logger.Debug("An inner exception occured while executing a command.", e.InnerException);
						throw e.InnerException;
					}
					throw e;
				}
			}
		}
	}



	public class PageCommandService : CommandService<IPageCommand>, IPageCommandService
	{
		public PageCommandService(ICommandContainerRepository commandContainerRepository)
			: base(commandContainerRepository, typeof(IPageCommandHandler), typeof(IPageCommandHandler<>))
		{
			
		}
	}

	public abstract class CommandService<T> where T : ICommand
	{
		private readonly CommandContainer commandContainer;

		public CommandService(ICommandContainerRepository commandContainerRepository, Type handlerType, Type genericHandlerType)
		{
			commandContainer = commandContainerRepository.GetCommandContainer(handlerType, genericHandlerType);
		}

		public void Execute(T command)
		{
			commandContainer.Execute(command);
		}
	}
}
