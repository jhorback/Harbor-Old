using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Harbor.Domain.Files;
using Harbor.Domain.Products;
using Harbor.Domain.Security;

namespace Harbor.Domain.Pages
{
	public sealed class Page : IAggregateRoot
	{
		public Page()
		{
			// Layout = new PageLayout(); // let the factory create the layout
			// since it is optionally loaded, don't want to overwrite it

			Properties = new List<PageProperty>();
			DeletedProperties = new List<PageProperty>();
			
			PageRoles = new List<PageRole>();
			DeletedPageRoles = new List<PageRole>();
			AllPageRoles = new List<PageFeatureRole>();
			
			// page resources
			Files = new List<File>();
			PageLinks = new List<Page>();
			PayPalButtons = new List<PayPalButton>();


			Created = DateTime.Now;
			Modified = DateTime.Now;
			Public = true;
			Enabled = true;
			TemplateStr = "";
			AutoPreviewImage = true;
			AutoPreviewText = true;
		}

		#region properties
		public int PageID { get; set; }


		public int? PageLayoutID { get; set; }

		[Required]
		[StringLength(50)]
		public string AuthorsUserName { get; set; }

		[Required]
		[StringLength(100)]
		public string Title { get; set; }

		[Required]
		[StringLength(50)]
		public string PageTypeKey { get; set; }

		[Required]
		public DateTime Created { get; set; }

		public DateTime Modified { get; set; }

		public bool Public { get; set; }

		public Guid? PreviewImageID { get; set; }

		public string PreviewText { get; set; }

		[DefaultValue(true)]
		public bool AutoPreviewText { get; set; }

		[DefaultValue(true)]
		public bool AutoPreviewImage { get; set; }

		/// <summary>
		/// Setting this sets the Template property.
		/// Get returns Template.ToString().
		/// </summary>
		[Required]
		public string TemplateStr
		{ 
			get
			{
				return Template.ToString();
			}
			set
			{
				Template = Template.Parse(value, PageID);
			}
		}

		[DefaultValue(true)]
		public bool Enabled { get; set; }


		public string VirtualPath
		{
			get
			{
				return GetVirtualPath(this);
			}
		}

		public static string GetVirtualPath(Page page)
		{
			return GetVirtualPath(page.PageID, page.Title);
		}

		public static string GetVirtualPath(int pageId, string pageTitle)
		{
			return string.Format("~/id/{0}/{1}", pageId, pageTitle.ToLower().Replace(" ", "-"));			
		}

		public bool? IsARootPage { get; set; }
		public string RootPageUrl { get; set; }
		#endregion

		#region associations
		public Template Template { get; set; }
		public PageLayout Layout { get; set; }
		public IPageType PageType { get; set; }

		public ICollection<PageProperty> Properties { get; set; }
		public ICollection<File> Files { get; set; } 
		public ICollection<Page> PageLinks { get; set; } 
		public ICollection<PayPalButton> PayPalButtons { get; set; }

		internal ICollection<PageRole> PageRoles { get; set; }
		internal IEnumerable<PageFeatureRole> AllPageRoles { get; set; } 

		// resources queued for deletion
		internal List<PageProperty> DeletedProperties { get; set; } 
		internal List<PageRole> DeletedPageRoles { get; set; }

		internal User Author { get; set; }
		public File PreviewImage { get; set; }

		#endregion

		#region methods
		public string GetProperty(string name)
		{
			var prop = Properties.FirstOrDefault(p => string.Compare(name, p.Name, true) == 0);
			return prop == null ? null : prop.Value;
		}

		public void SetProperty(string name, string property)
		{
			var props = Properties.Where(p => string.Compare(name, p.Name, true) == 0).ToList();
			
			PageProperty prop;
			if (props.Count == 0)
			{
				prop = new PageProperty
				{
					PageID = this.PageID,
					Name = name
				};
				Properties.Add(prop);
			}
			else
			{
				prop = props[0];
			}
			
			// make sure there is only one property with the same name
			if (props.Count > 1)
			{
				// delete removes the last property
				DeleteProperty(name);
			}
			
			prop.Value = property;
		}

		public string UICPropertyName(string uicid, string name)
		{
			return uicid + "-" + name;
		}

		public string GetUICProperty(string uicid, string name)
		{
			return GetProperty(UICPropertyName(uicid, name));
		}


		public void SetUICProperty(string uicid, string name, string value)
		{
			SetProperty(UICPropertyName(uicid, name), value);
		}


		public void DeleteProperty(string name)
		{
			var prop = Properties.LastOrDefault(p => string.Compare(name, p.Name, true) == 0);
			if (prop != null)
			{
				this.DeletedProperties.Add(prop);
				this.Properties.Remove(prop);
			}
		}
		#endregion

		PermissionsChecker<PageFeature> permissionsChecker = null;
		public bool HasPermission(string SID, Permissions permissions)
		{
			return HasPermission(SID, PageFeature.Page, permissions);
		}

		// jch* could in repository assign correct roles here -> author and public readers
		public bool HasPermission(string SID, PageFeature pageFeature, Permissions permissions)
		{
			if (pageFeature == PageFeature.Page)
			{
				// authorize authors on page CRUD
				if (AuthorsUserName == SID)
					return true;

				// authorize readers if public
				if (Public && permissions == Permissions.Read)
					return true;
			}
			
			var sidRoles = PageRoles.Where(r => r.SID == SID).ToList();
			if (permissionsChecker == null)
				permissionsChecker = new PermissionsChecker<PageFeature>(AllPageRoles, sidRoles);
			return permissionsChecker.HasPermission(pageFeature, permissions);
		}

		public File GetFile(Guid? fileID)
		{
			return Files.FirstOrDefault(f => f.FileID == fileID);
		}

		public Page GetPageLink(int pageID)
		{
			return PageLinks.FirstOrDefault(p => p.PageID == pageID);
		}

		public PayPalButton GetPayPalButton(int payPalButtonID)
		{
			return PayPalButtons.FirstOrDefault(l => l.PayPalButtonID == payPalButtonID);			
		}
	}
}
