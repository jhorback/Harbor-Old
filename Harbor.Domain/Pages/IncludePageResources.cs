
namespace Harbor.Domain.Pages
{
	public enum IncludePageResources
	{
		Properties = 1,
		PageLayout = 2,
		Roles = 4,
		PreviewImage = 8,
		Files = 16,
		Products = 32,
		PageLinks = 64,
		PayPalButtons = 128,
		Basic = (Properties | PageLayout | Roles | PreviewImage),
		All = (Properties | PageLayout | Roles | PreviewImage | Files | Products | PageLinks | PayPalButtons)
	}
}
