using System.Collections.Generic;
using Harbor.Domain.AppMenu.Menus;
using Harbor.Domain.Query;

namespace Harbor.Domain.AppMenu.Queries
{
	public class MenuQuery : CachedQueryBase<IEnumerable<MenuItemDto>>
	{
		private readonly MenuItemContext _menuItemContext;

		public MenuQuery(MenuItemContext menuItemContext)
		{
			_menuItemContext = menuItemContext;
		}

		// jch* - will want a user session cache (1 day?) with an event to bust the cache.
		public override IEnumerable<MenuItemDto> FromCache()
		{
			return base.FromCache();
		}

		public override IEnumerable<MenuItemDto> Execute()
		{
			var menu = new MainMenu();
			yield return GetDto(null, menu);
			foreach (var item in GetMenuItems(menu))
			{
				yield return item;
			}
		}

		public IEnumerable<MenuItemDto> GetMenuItems(Menu menu)
		{
			foreach (MenuItem item in menu.Items)
			{
				var dto = GetDto(menu.Id, item);
				if (dto == null)
				{
					continue;
				}

				yield return dto;

				if (item is Menu)
				{
					var subMenu = item as Menu;
					foreach (var subMenuItem in GetMenuItems(subMenu))
					{
						yield return subMenuItem;
					}
				}
			}
		}

		public MenuItemDto GetDto(string parentId, MenuItem item)
		{
			if (item.HasPermission(_menuItemContext) == false)
			{
				return null;
			}

			var dto = new MenuItemDto
			{
				parentId = parentId,
				id = item.Id,
				text = item.GetText(_menuItemContext)
			};

			if (item is MenuLink)
			{
				dto.url = (item as MenuLink).Url;
			}

			return dto;
		}
	}
}
