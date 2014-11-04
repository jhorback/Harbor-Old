using System.Threading.Tasks;

namespace Harbor.Domain.Query
{

	public abstract class CachedQueryBase<TResponse> :
		QueryBase<TResponse>,
		ICachedQuery<TResponse>
		where TResponse : class
	{
		public virtual TResponse FromCache()
		{
			return default(TResponse);
		}

		public TResponse ExecuteFromCache()
		{
			return FromCache() ?? Execute();
		}

		public async Task<TResponse> ExecuteFromCacheAsync()
		{
			return FromCache() ?? await ExecuteAsync();
		}
	}

	public abstract class CachedQueryBase<TResponse, TRequest> :
		QueryBase<TResponse, TRequest>,
		ICachedQuery<TResponse, TRequest>
		where TResponse : class
	{
		public virtual TResponse FromCache(TRequest query)
		{
			return default(TResponse);
		}

		public TResponse ExecuteFromCache(TRequest query)
		{
			return FromCache(query) ?? Execute(query);
		}

		public async Task<TResponse> ExecuteFromCacheAsync(TRequest query)
		{
			return FromCache(query) ?? await ExecuteAsync(query);
		}
	}
}
