
namespace Harbor.Data
{
	/// <summary>
	/// The scope of the unit of work is to be controlled by the lifetime assigned by the
	/// IOC container. In the case of the web, this will be the HttpContext.
	/// </summary>
	public interface IUnitOfWork
	{
		HarborContext Context { get; }
		void Save();
	}
}
