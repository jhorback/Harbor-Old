using System;

namespace Harbor.Domain.App
{
	public interface IRootPagesRepository
	{
		RootPages GetRootPages();
		string GetRootPageToken(int pageId);
		bool IsARootPage(string name);
		int? GetRootPageID(string name);
		string GetRootPageUrl(string name);
		void RemoveRootPage(string name);
		void AddRootPage(string name, int pageId);
		void Save();
	}
}
