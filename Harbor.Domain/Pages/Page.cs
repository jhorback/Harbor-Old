using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
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
			AllPageRoles = new List<PageFunctionalRole>();
			Created = DateTime.Now;
			Modified = DateTime.Now;
			Public = true;
			Enabled = true;
			TemplateStr = "";
			// Children = new List<Doc>();
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

		public int? ParentPageID { get; set; }

		[Required]
		public System.DateTime Created { get; set; }

		public System.DateTime Modified { get; set; }

		public bool Public { get; set; }

		/// <summary>
		/// Setting this sets the Template property.
		/// Get returns Template.ToString().
		/// </summary>
		// jch* should make this required during next db migration [Required]
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
		#endregion

		#region associations
		public Template Template { get; set; }

		public ICollection<PageProperty> Properties { get; set; }
		internal List<PageProperty> DeletedProperties { get; set; } 
		internal ICollection<PageRole> PageRoles { get; set; }
		internal List<PageRole> DeletedPageRoles { get; set; }
		internal IEnumerable<PageFunctionalRole> AllPageRoles { get; set; } 

		internal User Author { get; set; }
		internal Page Parent { get; set; }
		// public virtual ICollection<Doc> Children { get; set; }
		// jch - add PreviewImageID -> FileID when files are added
		// jch - PreviewText -> updated anytime the page is updated.
		// review naming of PreviewImageID and PreviewText
		#endregion

		#region methods
		/// <summary>
		/// Prepends the UICID to the property name.
		/// </summary>
		/// <param name="name"></param>
		/// <returns></returns>
		public string GetUICProperty(PageUIC uic, string name)
		{
			return GetProperty(uic.uicid + "-" + name);
		}

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

		PermissionsChecker<PageFunctionalArea> permissionsChecker = null;
		public bool HasPermission(string SID, Permissions permissions)
		{
			return HasPermission(SID, PageFunctionalArea.Page, permissions);
		}

		// jch* could in repository assign correct roles here -> author and public readers
		public bool HasPermission(string SID, PageFunctionalArea pageFunctionalArea, Permissions permissions)
		{
			if (pageFunctionalArea == PageFunctionalArea.Page)
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
				permissionsChecker = new PermissionsChecker<PageFunctionalArea>(AllPageRoles, sidRoles);
			return permissionsChecker.HasPermission(pageFunctionalArea, permissions);
		}
	}
}
