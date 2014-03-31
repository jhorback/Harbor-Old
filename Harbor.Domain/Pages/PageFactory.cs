using System;

namespace Harbor.Domain.Pages
{
	public class PageFactory : IPageFactory
	{
		IPageTypeRepository pageTypeRep;
		private readonly IObjectFactory _objectFactory;

		public PageFactory(IPageTypeRepository pageTypeRep, IObjectFactory objectFactory)
		{
			this.pageTypeRep = pageTypeRep;
			_objectFactory = objectFactory;
		}

		public Page Create(string userName, string pageTypeKey, string title, bool publish)
		{
			var pageType = pageTypeRep.GetPageType(pageTypeKey);

			if (pageType == null)
				throw new DomainValidationException("Pages cannot be created without a page type.");

			var page = new Page
			    {
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

			pageType.OnPageCreate(page);
			return page;
		}
	}
}
