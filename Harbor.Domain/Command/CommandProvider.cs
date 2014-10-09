using System;
using Harbor.Domain.Caching;

namespace Harbor.Domain.Command
{
	public class CommandProvider : ICommandProvider
	{
		private readonly IObjectFactory _objectFactory;
		private readonly IGlobalCache<CommandContainer> _commandContainerCache;

		public CommandProvider(IObjectFactory objectFactory, IGlobalCache<CommandContainer> commandContainerCache)
		{
			_objectFactory = objectFactory;
			_commandContainerCache = commandContainerCache;
		}

		public CommandContainer GetCommandContainer(Type handlerType, Type genericHandlerType)
		{
			var cacheKey = "CommandContainer:" + handlerType.FullName;
			var commandContainer = _commandContainerCache.Get(cacheKey);
			if (commandContainer == null)
			{
				commandContainer = _objectFactory.GetInstance<CommandContainer>();
				commandContainer.Initialize(handlerType, genericHandlerType);
				_commandContainerCache.Set(cacheKey, commandContainer, DateTime.Now.AddDays(1));
			}
			return commandContainer;
		}
	}
}
