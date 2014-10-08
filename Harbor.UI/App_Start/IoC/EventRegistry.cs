using Harbor.Domain;
using StructureMap.Configuration.DSL;

namespace Harbor.UI.IoC
{
	public class CacheRegistry : Registry
	{
		public CacheRegistry()
		{
			For(typeof(IGlobalCache<>)).Use(typeof(GlobalCache<>));
			For(typeof(IUserCache<>)).Use(typeof(UserCache<>));
		}
	}
}