using Harbor.Domain.Event;

namespace Harbor.Domain.Pages.Events
{
	public class PageChangedEvent : IEvent
	{
		public int PageID { get; set; }
	}
}
