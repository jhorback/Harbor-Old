using System;

namespace Harbor.Domain.Pages
{
	public interface IPageCommandService
	{
		void Execute(IPageCommand command);
		Type GetCommandType(string command);
	}
}