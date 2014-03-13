
namespace Harbor.Domain.Pipeline
{
	public interface IPipelineHanlder<T>
	{
		void Execute(IPipelineContext<T> context);
	}
}
