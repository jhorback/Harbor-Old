using System;

namespace Harbor.Domain.Pages
{
	public class PageFactory : IPageFactory
	{
		private readonly PageCreatePipeline _pageCreatePipeline;

		public PageFactory(IPageTypeRepository pageTypeRep, PageCreatePipeline pageCreatePipeline)
		{
			_pageCreatePipeline = pageCreatePipeline;
		}

		public Page Create(string userName, string pageTypeKey, string title, bool publish)
		{
			var page = new Page
			    {
			        AuthorsUserName = userName,
					PageTypeKey = pageTypeKey,
			        Title = title,
			        Public = publish,
			        Created = DateTime.Now,
			        Modified = DateTime.Now,
			        AllPageRoles = new PageFeatureRoleRepository().GetRoles(),
					Enabled = true
			    };

			_pageCreatePipeline.Execute(page);

			return page;
		}
	}
}
