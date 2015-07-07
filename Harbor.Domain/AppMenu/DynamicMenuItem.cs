
namespace Harbor.Domain.AppMenu
{
	public abstract class DynamicMenuLink : MenuLink
	{
		public override string Text
		{
			get { throw new System.NotImplementedException(); }
		}

		public abstract override string GetText(MenuItemContext context);
	}
}
