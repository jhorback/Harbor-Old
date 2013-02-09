using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web.Optimization;

namespace Harbor.UI.Models.Theming
{
	public class ThemeCollection : IEnumerable<ITheme>, IEnumerable
	{
		readonly List<ITheme> themes = new List<ITheme>();

		public IEnumerator<ITheme> GetEnumerator()
		{
			return themes.GetEnumerator();
		}

		IEnumerator IEnumerable.GetEnumerator()
		{
			return themes.GetEnumerator();
		}

		public void Add(ITheme theme)
		{
			if (Bundles == null)
				throw new InvalidOperationException("Cannot add a theme without first setting the Bundles.");

			Add(theme, Bundles);
		}

		public void Add(ITheme theme, BundleCollection bundles)
		{
			if (bundles == null)
				throw new ArgumentException("Argument cannot be null.", "bundles");

			themes.Add(theme);
			if (theme.SiteStyleBundle != null)
				bundles.Add(theme.SiteStyleBundle);
		}

		public BundleCollection Bundles { get; set; }

		public ITheme GetTheme(string name)
		{
			return themes.FirstOrDefault(p => p.Name == name);
		}

		public void Clear()
		{
			themes.Clear();
		}
	}
}