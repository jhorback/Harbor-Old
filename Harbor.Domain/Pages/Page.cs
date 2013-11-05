﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web.Script.Serialization;
using Harbor.Domain.Files;
using Harbor.Domain.PageNav;
using Harbor.Domain.Pages.PageResources;
using Harbor.Domain.Products;
using Harbor.Domain.Security;

namespace Harbor.Domain.Pages
{
	public sealed class Page : IAggregateRoot
	{
		public Page()
		{
			Properties = new List<PageProperty>();
			DeletedProperties = new List<PageProperty>();
			
			PageRoles = new List<PageRole>();
			DeletedPageRoles = new List<PageRole>();
			AllPageRoles = new List<PageFeatureRole>();
			
			// page resources
			Files = new List<File>();
			PageLinks = new List<Page>();
			NavLinks = new List<NavLinks>();


			Created = DateTime.Now;
			Modified = DateTime.Now;
			Public = true;
			Enabled = true;
			TemplateStr = "";
			AutoPreview = true;
		}

		#region properties
		public int PageID { get; set; }

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
		public System.DateTime Created { get; set; }

		public System.DateTime Modified { get; set; }

		public bool Public { get; set; }

		public Guid? PreviewImageID { get; set; }

		public string PreviewText { get; set; }

		[DefaultValue(true)]
		public bool AutoPreview { get; set; }

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
				return string.Format("~/id/{0}/{1}", PageID, Title.ToLower().Replace(" ", "-"));
			}
		}
		#endregion

		#region associations
		public Template Template { get; set; }

		public ICollection<PageProperty> Properties { get; set; }
		public ICollection<File> Files { get; set; } 
		public ICollection<Page> PageLinks { get; set; } 
		public ICollection<NavLinks> NavLinks { get; set; }
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
			var prop = this.Properties.Where(p => string.Compare(name, p.Name, true) == 0).FirstOrDefault();
			if (prop == null)
			{
				prop = new PageProperty
				{
					PageID = this.PageID,
					Name = name
				};
				Properties.Add(prop);
			}
			prop.Value = property;
		}

		public string GetUICProperty(string uicid, string name)
		{
			return GetProperty(uicid + "-" + name);
		}


		public void SetUICProperty(string uicid, string name, string value)
		{
			SetProperty(uicid + "-" + name, value);
		}


		public void DeleteProperty(string name)
		{
			var prop = Properties.FirstOrDefault(p => string.Compare(name, p.Name, true) == 0);
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

		public T GetComponent<T>(string uicid) where T : PageComponent
		{
			var comp = (T)Activator.CreateInstance(typeof(T), this, uicid);
			return comp;
		}

		public PageComponent GetComponent(Type componentType, string uicid)
		{
			var obj = Activator.CreateInstance(componentType, this, uicid);
			return obj as PageComponent;
		}

		public File GetFile(Guid? fileID)
		{
			return Files.FirstOrDefault(f => f.FileID == fileID);
		}

		public Page GetPageLink(int pageID)
		{
			return PageLinks.FirstOrDefault(p => p.PageID == pageID);
		}

		public NavLinks GetNavLinks(int navLinksID)
		{
			return NavLinks.FirstOrDefault(l => l.NavLinksID == navLinksID);
		}
	}
}
