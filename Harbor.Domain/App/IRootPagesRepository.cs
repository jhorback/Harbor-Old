
namespace Harbor.Domain.App
{
	public interface IRootPagesRepository
	{
		RootPages GetRootPages();
		bool IsARootPage(string name);
		int? GetRootPageID(string name);
		void RemoveRootPage(string name);
		void AddRootPage(string name, int pageId);
		void Save();
	}
}
