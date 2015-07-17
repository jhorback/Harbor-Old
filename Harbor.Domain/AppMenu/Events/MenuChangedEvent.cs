using Harbor.Domain.Event;

namespace Harbor.Domain.AppMenu.Events
{
	/// <summary>
	/// Trigger this event to bust the menu cache.
	/// </summary>
	public class MenuChangedEvent : IEvent
	{
	}
}
