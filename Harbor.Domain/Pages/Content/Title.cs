
namespace Harbor.Domain.Pages.Content
{
	public class Title
	{
		public string DisplayTitle { get; set; }
		public string ParentUrl { get; set; }

		public bool HasParentUrl
		{
			get
			{
				return !string.IsNullOrEmpty(ParentUrl);
			}
		}
	}
}
