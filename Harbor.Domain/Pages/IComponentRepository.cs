using System;
using System.Collections.Generic;
namespace Harbor.Domain.Pages
{
	/// <summary>
	/// Provides access to the available components.
	/// </summary>
	public interface IComponentRepository
	{
		/// <summary>
		/// Returns all components.
		/// </summary>
		/// <returns></returns>
		List<ComponentType> GetAllComponents();

		/// <summary>
		/// The the type of the page component instance.
		/// </summary>
		/// <param name="key"></param>
		/// <returns></returns>
		Type GetPageComponentType(string key);

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
		ComponentType GetComponent(string key);


	}
}
