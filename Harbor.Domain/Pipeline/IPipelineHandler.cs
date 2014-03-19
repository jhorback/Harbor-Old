
namespace Harbor.Domain.Pipeline
{
	public interface IPipelineHanlder<T>
	{
		void Execute(T context);
	}
}
