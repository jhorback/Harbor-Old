
namespace Harbor.Domain.Query
{
	public interface ICachedQuery<TResponse> : IQuery<TResponse>
	{
		TResponse ExecuteCached();
	}

	public interface ICachedQuery<TResponse, in TRequest> : IQuery<TResponse, TRequest>
	{
		TResponse ExecuteCached(TRequest query);
	}
}
