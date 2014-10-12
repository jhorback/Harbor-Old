
using System.Threading.Tasks;

namespace Harbor.Domain.Query
{
	public interface ICachedQuery<TResponse> : IQuery<TResponse> where TResponse : class
	{
		TResponse FromCache();
		TResponse ExecuteFromCache();
		Task<TResponse> ExecuteFromCacheAsync();
	}

	public interface ICachedQuery<TResponse, in TRequest> : IQuery<TResponse, TRequest> where TResponse : class
	{
		TResponse FromCache(TRequest query);
		TResponse ExecuteFromCache(TRequest query);
		Task<TResponse> ExecuteFromCacheAsync(TRequest query);
	}
}
