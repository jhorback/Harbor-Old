using System.Collections.Generic;
namespace Harbor.Domain.Pages
{
	/// <summary>
	/// Provides access to the available components.
	/// </summary>
	public interface IPageComponentRepository
	{
		/// <summary>
		/// Returns all components.
		/// </summary>
		/// <returns></returns>
		List<PageComponentType> GetAllComponents();

		/// <summary>
		/// Returns all header components.
		/// </summary>
		/// <returns></returns>
		List<HeaderComponent> GetHeaderComponents();

		/// <summary>
		/// Returns all gutter components.
		/// </summary>
		/// <returns></returns>
		List<AsideComponent> GetAsideComponents();

		/// <summary>
		/// Returns all content components.
		/// </summary>
		/// <returns></returns>
		List<ContentComponent> GetContentComponents();

		/// <summary>
		/// Returns the specified component.
		/// </summary>
		/// <param name="key"></param>
		/// <returns></returns>
		PageComponentType GetComponent(string key);


	}
}
