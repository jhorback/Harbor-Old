
namespace Harbor.Domain.App
{
	public interface IRootPagesRepository
	{
		RootPages GetRootPages();
		bool IsRootPage(string name);
		void RemoveRootPage(int id);
		void AddRootPage(int id, string text);
		void Save();
	}
}
