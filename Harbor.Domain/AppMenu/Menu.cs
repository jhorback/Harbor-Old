using System.Collections.Generic;

namespace Harbor.Domain.AppMenu
{
	public abstract class Menu : MenuItem
	{
		public abstract List<MenuItem> Items { get; }
	}
}
