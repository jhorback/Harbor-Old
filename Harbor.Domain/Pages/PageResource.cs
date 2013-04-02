
namespace Harbor.Domain.Pages
{
	public abstract class PageResource
	{
		public PageResource(Page page)
		{
			Page = page;
		}

		public Page Page { get; set; }

		public abstract void Add();

		public abstract void Remove();
	}
}
