using System.Collections.Generic;
using Harbor.Domain.App;
using Harbor.Domain.AppMenu.Menus;
using Harbor.Domain.Security;

namespace Harbor.Domain.AppMenu
{
	public abstract class MenuItem
	{
		public abstract string Id { get; }
		public abstract string Text { get; }

		public virtual bool HasPermission(MenuItemContext context)
		{
			return true;
		}

		public virtual string GetText(MenuItemContext context)
		{
			return Text;
		}
	}
}
