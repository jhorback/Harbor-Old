using System.Threading.Tasks;
using System.Web;

namespace Harbor.Domain.Query
{
	public abstract class QueryBase<TResponse, TRequest> : IQuery<TResponse, TRequest>
	{
		public abstract TResponse Execute(TRequest query);

		public virtual Task<TResponse> ExecuteAsync(TRequest query)
		{
			return new TaskFactory<TResponse>().StartNew((httpContext) =>
			{
				HttpContext.Current = httpContext as HttpContext;
				return Execute(query);
			}, HttpContext.Current);
		}
	}

	public abstract class QueryBase<TResponse> : IQuery<TResponse>
	{
		public abstract TResponse Execute();

		public virtual Task<TResponse> ExecuteAsync()
		{
			return new TaskFactory<TResponse>().StartNew((httpContext) =>
			{
				HttpContext.Current = httpContext as HttpContext;
				return Execute();
			}, HttpContext.Current);
		}
	}
}
