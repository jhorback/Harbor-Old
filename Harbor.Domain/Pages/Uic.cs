
namespace Harbor.Domain.Pages
{
	public class Uic
	{
		public string Key { get; set; }
		public string Id { get; set; }
	}

	public class TemplateUic : Uic
	{
		public string[] ClassNames { get; set; }
	}
}
