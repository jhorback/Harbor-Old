
namespace Harbor.Domain.Query
{
	public abstract class CacheableQueryParams
	{
		public string GetCacheKey()
		{
			return JSON.Stringify(this);
		}
	}
}
