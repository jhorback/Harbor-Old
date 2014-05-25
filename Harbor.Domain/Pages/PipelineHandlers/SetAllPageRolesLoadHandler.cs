using Harbor.Domain.Pipeline;

namespace Harbor.Domain.Pages
{
	public class SetAllPageRolesLoadHandler : IPipelineHanlder<Page>
	{
		private readonly PageFeatureRoleRepository _pageFeatureRoleRepository;

		public SetAllPageRolesLoadHandler(PageFeatureRoleRepository pageFeatureRoleRepository)
		{
			_pageFeatureRoleRepository = pageFeatureRoleRepository;
		}

		public void Execute(Page page)
		{
			page.AllPageRoles = _pageFeatureRoleRepository.GetRoles();
		}
	}
}
