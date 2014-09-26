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
			[Obsolete("Only centered uses readable, there is no longer any default readable class names.")]
			ContentReadable = 1,
			ContentCentered = 2,
			NoAside = 4
		}

		public PageLayout()
		{
			
		}

		public int PageLayoutID { get; set; }

		
		public int? ParentPageID { get; set; }


		/// <summary>
		/// This is the page type of the page when first created.
		/// </summary>
		[StringLength(50)]
		public string PageTypeKey { get; set; }

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

		/// <summary>
		/// The key of the header content type.
		/// </summary>
		public string HeaderKey { get; set; }

		/// <summary>
		/// The header data as stored in the database.
		/// </summary>
		public string HeaderDataStr { get; set; }

		/// <summary>
		/// Returns the untyped version of GetHeaderData.
		/// </summary>
		public object HeaderData
		{
			get
			{
				return _header;
			}
		}

		/// <summary>
		/// The UI fields for the header.
		/// </summary>
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


		/// <summary>
		/// The key of the aside content type.
		/// </summary>
		public string AsideKey { get; set; }

		/// <summary>
		/// The aside data as stored in the database.
		/// </summary>
		public string AsideDataStr { get; set; }

		/// <summary>
		/// Returns the untyped version of GetAsideData.
		/// </summary>
		public object AsideData
		{
			get
			{
				return _aside;
			}
		}

		/// <summary>
		/// The UI fields for the aside.
		/// </summary>
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

		public T GetHeaderData<T>()
		{
			return (T) _header;
		}

		public void SetHeaderData<T>(T header)
		{
			_header = header;
			HeaderDataStr = JSON.Stringify(header);
		}

		public T GetAsideAdata<T>()
		{
			return (T)_aside;
		}

		public void SetAsideData<T>(T aside)
		{
			_aside = aside;
			AsideDataStr = JSON.Stringify(aside);
		}

		#region associations
		public User Owner { get; set; }
		#endregion
	}
}
