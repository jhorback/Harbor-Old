using Harbor.Domain.Event;

namespace Harbor.Domain.Pages.Events
{
	public class PageDeletedEvent : IEvent
	{
		public Page Page { get; set; }
	}
}
