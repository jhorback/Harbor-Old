
namespace Harbor.Domain.Pages
{
	public abstract class PageResource
	{
		public PageResource(Page page)
		{
			Page = page;
		}

		public Page Page { get; set; }

		public new abstract bool Equals(object obj);
	}
}
