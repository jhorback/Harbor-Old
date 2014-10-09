using System;

namespace Harbor.Domain.Command
{
	public interface ICommandProvider
	{
		CommandContainer GetCommandContainer(Type handlerType, Type genericHandlerType);
	}
}
