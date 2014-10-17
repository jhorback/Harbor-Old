using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Harbor.Domain.Pages
{
	public interface IPageTypeRepository
	{
		IEnumerable<IPageType> GetPageTypes();

		IDictionary<string, List<IPageType>> GetPageTypesToAdd();

		IDictionary<string, List<IPageType>> GetPageTypesToAdd(string parentPageTypeKey);

		/// <summary>
		/// Returns the page type matching the specified key.
		/// </summary>
		/// <param name="key"></param>
		/// <param name="useDefault">If the key or page type cannot be determined, the default page type will be returned.</param>
		/// <returns></returns>
		IPageType GetPageType(string key, bool useDefault = false);
	}
}
