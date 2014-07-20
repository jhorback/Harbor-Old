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

		public string HeaderDataStr { get; set; }

		public string AsideKey { get; set; }

		public string AsideDataStr { get; set; }

		public Uic Header
		{
			get
			{
				if (HeaderKey == null)
				{
					return null;
				}

				return new Uic
				{
					Key = HeaderKey,
					Id = string.Format("pl-{0}-{1}", PageLayoutID, HeaderKey)
				};
			}
		}

		public Uic Aside
		{
			get
			{
				if (AsideKey == null)
				{
					return null;
				}

				return new Uic
				{
					Key = AsideKey,
					Id = string.Format("pl-{0}-{1}", PageLayoutID, AsideKey)
				};
			}
		}



		private object _header;
		private object _aside;
		// needs to be an object Header property?!

		/*Page.Layout.Header<T> //jch! - still need to figure the best way to do this
		 * */
		//var header = new JavaScriptSerializer().Deserialize<T>(HeaderData);

		public T GetHeaderData<T>()
		{
			return (T) _header;
		}

		public void SetHeaderData<T>(T header)
		{
			_header = header;
		}

		public T GetAsideAdata<T>()
		{
			return (T)_aside;
		}

		public void SetAsideData<T>(T aside)
		{
			_aside = aside;
		}

		#region associations
		public User Owner { get; set; }
		#endregion
	}
}
