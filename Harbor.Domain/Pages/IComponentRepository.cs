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
		List<PageContentType> GetAllComponents();

		/// <summary>
		/// The the type of the page component instance.
		/// </summary>
		/// <param name="key"></param>
		/// <returns></returns>
		Type GetPageComponentType(string key);

		/// <summary>
		/// Returns all content components.
		/// </summary>
		/// <returns></returns>
		List<PageContentType> GetContentComponents();

		/// <summary>
		/// Returns the specified component.
		/// </summary>
		/// <param name="key"></param>
		/// <returns></returns>
		PageContentType GetComponent(string key);
	}
}
