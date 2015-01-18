
namespace Harbor.Domain.Query
{
	public class QueryService : IQueryService
	{
		private readonly IObjectFactory _objectFactory;

		public QueryService(IObjectFactory objectFactory)
		{
			_objectFactory = objectFactory;
		}

		public T GetQuery<T>()
		{
			return _objectFactory.GetInstance<T>();
		}
	}
}
