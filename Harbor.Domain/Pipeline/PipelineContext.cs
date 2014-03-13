
namespace Harbor.Domain.Pipeline
{
	public class PipelineContext<T> : IPipelineContext<T>
	{
		public PipelineContext(T target)
		{
			Target = target;
		}

		public T Target { get; private set; }
	}
}
