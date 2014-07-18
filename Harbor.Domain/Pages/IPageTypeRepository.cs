using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Harbor.Domain.Pages
{
	public interface IPageTypeRepository
	{
		IEnumerable<PageType> GetPageTypes();

		/// <summary>
		/// Returns the page type matching the specified key.
		/// </summary>
		/// <param name="key"></param>
		/// <param name="useDefault">If the key or page type cannot be determined, the default page type will be returned.</param>
		/// <returns></returns>
		PageType GetPageType(string key, bool useDefault = false);
	}
}
