using System;
using Harbor.Domain.Caching;

namespace Harbor.Domain
{
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
}
