
namespace Harbor.Domain.Pages
{
	public enum IncludePageResources
	{
		Properties = 1,
		Roles = 2,
		PreviewImage = 4,
		Files = 8,
		Products = 16,
		PageLinks = 32,
		PayPalButtons = 64,
		Basic = (Properties | Roles | PreviewImage),
		All = (Properties | Roles | PreviewImage | Files | Products | PageLinks | PayPalButtons)
	}
}
