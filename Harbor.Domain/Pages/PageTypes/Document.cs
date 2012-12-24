
namespace Harbor.Domain.Pages.PageTypes
{
	/// <summary>
	/// Defines a generic document template.
	/// </summary>
	public class Document : PageType
	{
		public override string Key
		{
			get { return "document"; }
		}

		public override string Name
		{
			get { return "Document"; }
		}

		public override string Description
		{
			get { return "A generic empty document."; }
		}

		public override void DefineTemplate(PageTypeContext context)
		{
			context.SetLayout(LayoutProperties.None)
				.SetHeader(Components.Title.KEY)
				.AddAside(Components.Links.KEY)
				.AddContent(Components.Text.KEY);
		}
	}
}
