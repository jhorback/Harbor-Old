
namespace Harbor.Domain.Pages
{
	public class PageTypeTemplateContext
	{
		public PageTypeTemplateContext(Page page)
		{
			Page = page;
		}

		public Page Page { get; set; }


		public virtual PageTypeTemplateContext AddContent(TemplateContentType type)
		{
			return AddContent(type, new[] { Page.Template.DefaultContentClassName });
		}

		public virtual PageTypeTemplateContext AddContent(TemplateContentType type, params string[] classNames)
		{
			var item = new TemplateUic
			{
				Key = type.Key,
				ClassNames = classNames
			};

			Page.Template.Content.Add(item);
			return this;
		}

		public PageTypeTemplateContext PrependContent(bool prepend = true)
		{
			Page.Template.PrependContentByDefault = prepend;
			return this;
		}

		public PageTypeTemplateContext SetDefaultContentClassName(string className)
		{
			Page.Template.DefaultContentClassName = className;
			return this;
		}
	}
}
