using System.Threading.Tasks;

namespace Harbor.Domain.Query
{
	public interface IQuery<TResponse>
	{
		TResponse Execute();
		Task<TResponse> ExecuteAsync();
	}

	public interface IQuery<TResponse, in TRequest>
	{
		TResponse Execute(TRequest query);
		Task<TResponse> ExecuteAsync(TRequest query);
	}
}
