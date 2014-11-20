
using System.Linq;

namespace Harbor.Domain.Pages
{
	public class Uic
	{
		private string _key;

		public string Key
		{
			get { return _key; }
			set { _key = string.IsNullOrEmpty(value) ? null : value.ToLower(); }
		}

		public string Id { get; set; }
	}

	public class TemplateUic : Uic
	{
		public string[] ClassNames { get; set; }

		public bool StartsNewRow
		{
			get
			{
				return ClassNames.Contains("clear");
			}
		}
	}
}
