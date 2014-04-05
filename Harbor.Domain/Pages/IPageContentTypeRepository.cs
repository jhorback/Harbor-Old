using System;
using System.Collections.Generic;
namespace Harbor.Domain.Pages
{
	/// <summary>
	/// Provides access to the available components.
	/// </summary>
	public interface IPageContentTypeRepository
	{
		/// <summary>
		/// Returns all content types available in the system.
		/// </summary>
		/// <returns></returns>
		List<PageContentType> GetPageContentTypes();

		/// <summary>
		/// The the type of the page content type instance.
		/// </summary>
		/// <param name="key"></param>
		/// <returns></returns>
		Type GetTypeOfPageContentType(string key);

		/// <summary>
		/// Returns the specified content type.
		/// </summary>
		/// <param name="key"></param>
		/// <returns></returns>
		PageContentType GetPageContentType(string key);
	}
}
