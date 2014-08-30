
namespace Harbor.UI.Models
{
	/// <summary>
	/// Works with the MapDtoFrom attribute to enable
	/// runtime mapping of dtos.
	/// </summary>
	public interface IDtoMapper
	{
		object MapFrom(object source);
	}
}