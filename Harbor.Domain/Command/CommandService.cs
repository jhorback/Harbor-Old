using System;

namespace Harbor.Domain.Command
{
	public abstract class CommandService<T> where T : ICommand
	{
		private readonly CommandContainer commandContainer;

		public CommandService(ICommandProvider commandContainerRepository, Type handlerType, Type genericHandlerType)
		{
			commandContainer = commandContainerRepository.GetCommandContainer(handlerType, genericHandlerType);
		}

		public void Execute(T command)
		{
			commandContainer.Execute(command);
		}
	}
}
