
namespace Harbor.Domain.Security
{
	/// <summary>
	/// Global features.
	/// Each scoped features should their own enums.
	/// </summary>
	public enum UserFeature
	{
		None,
		SystemSettings,
		SiteSettings,
		Users,
		Pages,
		PageTemplates,
		Files
	}
}

