using Harbor.Domain.Command;

namespace Harbor.Domain.Pages.Commands
{
	public abstract class PageCommand : ICommand
	{
		public int ID { get; set; }

		public int PageID
		{
			get { return ID; }
		}
	}
}
