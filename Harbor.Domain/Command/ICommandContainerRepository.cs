using System;

namespace Harbor.Domain
{
	public interface ICommandContainerRepository
	{
		CommandContainer GetCommandContainer(Type handlerType, Type genericHandlerType);
	}
}
