using System;
using System.ComponentModel.DataAnnotations;
using System.Web.Script.Serialization;
using Harbor.Domain.Security;

namespace Harbor.Domain.Pages
{
	public class PageLayout : IAggregateRoot
	{
		[Flags]
		public enum LayoutDisplayProperties
		{
			None = 0,
			ContentReadable = 1,
			ContentCentered = 2,
			NoAside = 4
		}

		public PageLayout()
		{
			
		}

		public int PageLayoutID { get; set; }

		public bool IsNew()
		{
			return PageLayoutID == 0;
		}

		[StringLength(50)]
		[Required]
		public string UserName { get; set; }

		[StringLength(100)]
		[Required]
		public string Title { get; set; }

		public LayoutDisplayProperties DisplayProperties { get; set; }

		public string HeaderKey { get; set; }

		public string HeaderData { get; set; }

		public string AsideKey { get; set; }

		public string AsideData { get; set; }

		public Template.Uic Header
		{
			get
			{
				return new Template.Uic
				{
					key = HeaderKey,
					uicid = string.Format("pl-{0}-{1}", PageLayoutID, HeaderKey)
				};
			}
		}

		public Template.Uic Aside
		{
			get
			{
				return new Template.Uic
				{
					key = AsideKey,
					uicid = string.Format("pl-{0}-{1}", PageLayoutID, AsideKey)
				};
			}
		}


		public T GetHeader<T>()
		{
			// jch! - need the ObjectFactory for injection here!?
			var header = new JavaScriptSerializer().Deserialize<T>(HeaderData);
			return header;
		}

		public T GetAside<T>()
		{
			var aside = new JavaScriptSerializer().Deserialize<T>(AsideData);
			return aside;
		}

		#region associations
		public User Owner { get; set; }
		#endregion
	}
}
