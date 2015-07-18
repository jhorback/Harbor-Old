using System;
using System.Collections.Generic;
using Harbor.Domain.AppMenu.Events;
using Harbor.Domain.AppMenu.Menus;
using Harbor.Domain.Caching;
using Harbor.Domain.Event;
using Harbor.Domain.Query;

namespace Harbor.Domain.AppMenu.Queries
{
	public class MenuQuery : CachedQueryBase<IEnumerable<MenuItemDto>>, IEventSubscriber<MenuChangedEvent>
	{
		private readonly MenuItemContext _menuItemContext;
		private readonly IPathUtility _pathUtility;
		private readonly IUserCache<List<MenuItemDto>> _menuItemCache;
		private int _nextOrder = 0;

		public MenuQuery(
			MenuItemContext menuItemContext,
			IPathUtility pathUtility,
			IUserCache<List<MenuItemDto>> menuItemCache)
		{
			_menuItemContext = menuItemContext;
			_pathUtility = pathUtility;
			_menuItemCache = menuItemCache;
		}

		public override IEnumerable<MenuItemDto> FromCache()
		{
			return _menuItemCache.Get() ?? Execute();
		}

		public override IEnumerable<MenuItemDto> Execute()
		{
			var items = new List<MenuItemDto>();
			var menu = new MainMenu();
			items.Add(GetDto(null, menu));
			items.AddRange(GetMenuItems(menu));
			_menuItemCache.Set(items, DateTime.Now.AddHours(2));
			return items;
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
				text = item.GetText(_menuItemContext),
				order = _nextOrder++
			};

			if (item is MenuLink)
			{
				dto.url = _pathUtility.ToAbsolute((item as MenuLink).Url);
			}

			return dto;
		}

		public void Handle(MenuChangedEvent data)
		{
			_menuItemCache.Remove();
		}
	}
}
