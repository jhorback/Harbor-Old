using System.Web.Optimization;

namespace Harbor.UI.Models.Theming
{
	/// <summary>
	/// Describes the contents of a CSS theme.
	/// Reference on fav-icons:
	///     http://www.jonathantneal.com/blog/understand-the-favicon/
	/// </summary>
	public interface ITheme
	{
		/// <summary>
		/// The identifying name / key.
		/// </summary>
		string Name { get; }

		/// <summary>
		/// The bundle for the primary css theme.
		/// </summary>
		Bundle SiteStyleBundle { get; }

		/// <summary>
		/// Standard favicon - 16px ico.
		/// </summary>
		string FavIcon { get; }

		/// <summary>
		/// Favicon for browsers that support png - 32px png.
		/// </summary>
		string FavIconPng { get; }
		
		/// <summary>
		/// For apple - 57px png.
		/// </summary>
		string TouchIcon { get; }

		/// <summary>
		/// For metro - 144px png.
		/// </summary>
		string TileIcon { get; }

		/// <summary>
		/// The hex background color for metro tiles.
		/// </summary>
		string TileColor { get; }
	}
}
