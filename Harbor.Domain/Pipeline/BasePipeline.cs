using System.Collections.Generic;

namespace Harbor.Domain.Pipeline
{
	public abstract class BasePipeline<T> : IPipeline<T>
	{
		protected BasePipeline(IObjectFactory objectFactory)
		{
			handlers = new List<IPipelineHanlder<T>>();
			_objectFactory = objectFactory;
		}

		private List<IPipelineHanlder<T>> handlers { get; set; }
		private readonly IObjectFactory _objectFactory;

		public void AddHandler<TH>() where TH : IPipelineHanlder<T>
		{
			handlers.Add(_objectFactory.GetInstance<TH>());
		}

		public void Execute(T context)
		{
			handlers.ForEach(h => h.Execute(context));
		}
	}
}
