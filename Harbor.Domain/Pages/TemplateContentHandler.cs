
namespace Harbor.Domain.Pages
{
	public abstract class TemplateContentHandler
	{
		public abstract object GetTemplateContent(Page page, TemplateUic uic);
		public abstract void SetTemplateContent(Page page, TemplateUic uic);
	}
}
