using System.Threading.Tasks;

namespace Harbor.Domain.Query
{
	public abstract class QueryBase<TResponse, TRequest> : IQuery<TResponse, TRequest>
	{
		public abstract TResponse Execute(TRequest query);

		public virtual Task<TResponse> ExecuteAsync(TRequest query)
		{
			return new TaskFactory<TResponse>().StartNew(() => Execute(query));
		}
	}

	public abstract class QueryBase<TResponse> : IQuery<TResponse>
	{
		public abstract TResponse Execute();

		public virtual Task<TResponse> ExecuteAsync()
		{
			return new TaskFactory<TResponse>().StartNew(Execute);
		}
	}
}
