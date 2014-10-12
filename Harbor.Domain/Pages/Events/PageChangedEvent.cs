using Harbor.Domain.Event;

namespace Harbor.Domain.Pages.Events
{
	public class PageChangedEvent : IEvent
	{
		public Page Page { get; set; }
	}
}
