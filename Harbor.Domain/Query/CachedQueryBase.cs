
namespace Harbor.Domain.Query
{

	public abstract class CachedQueryBase<TResponse> : QueryBase<TResponse>, ICachedQuery<TResponse>
	{
		public virtual TResponse ExecuteCached()
		{
			return default(TResponse);
		}
	}

	public abstract class CachedQueryBase<TResponse, TRequest> : QueryBase<TResponse, TRequest>, ICachedQuery<TResponse, TRequest>
	{
		public virtual TResponse ExecuteCached(TRequest query)
		{
			return default(TResponse);
		}
	}
}
