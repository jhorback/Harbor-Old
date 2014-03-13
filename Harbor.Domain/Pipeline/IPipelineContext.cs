
namespace Harbor.Domain.Pipeline
{
	public interface IPipelineContext<out T>
	{
		T Target { get; }
	}
}
