using System;

namespace Harbor.Domain.Pages
{
	public class PageFactory : IPageFactory
	{
		IPageTypeRepository pageTypeRep;

		public PageFactory(IPageTypeRepository pageTypeRep)
		{
			this.pageTypeRep = pageTypeRep;
		}

		public Page Create(int? parentDocID, string userName, string pageTypeKey, string title, bool publish)
		{
			var pageType = pageTypeRep.GetPageType(pageTypeKey);
			if (pageType == null)
				throw new DomainValidationException("Pages cannot be created without a template.");

			var doc = new Page
			    {
			        ParentPageID = parentDocID,
			        AuthorsUserName = userName,
					PageTypeKey = pageTypeKey,
			        Title = title,
			        Public = publish,
			        Created = DateTime.Now,
			        Modified = DateTime.Now,
			        AllPageRoles = new PageFeatureRoleRepository().GetRoles(),
					Enabled = true,
					Template = pageType.Template
			    };

			return doc;
		}
	}
}
