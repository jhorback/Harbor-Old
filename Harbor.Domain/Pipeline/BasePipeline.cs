using System.Collections.Generic;

namespace Harbor.Domain.Pipeline
{
	public abstract class BasePipeline<T> : IPipeline<T>
	{
		protected BasePipeline(IObjectFactory objectFactory)
		{
			handlers = new List<IPipelineHanlder<T>>();
			this.objectFactory = objectFactory;
		}

		private readonly IObjectFactory objectFactory;
		private List<IPipelineHanlder<T>> handlers { get; set; }

		public void AddHandler<TH>() where TH : IPipelineHanlder<T>
		{
			handlers.Add(this.objectFactory.GetInstance<TH>());
		}

		public void Execute(IPipelineContext<T> context)
		{
			handlers.ForEach(h => h.Execute(context));
		}

		public void Execute(T target)
		{
			var context = new PipelineContext<T>(target);
			Execute(context);
		}
	}
}
