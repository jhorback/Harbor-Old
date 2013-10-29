using System.Web.Http.Dependencies;
using StructureMap;

namespace Harbor.UI.IoC
{
	public class StructureMapDependencyResolver : StructureMapDependencyScope, IDependencyResolver
	{
		public StructureMapDependencyResolver(IContainer container) : base(container) { }
		
		public IDependencyScope BeginScope()
		{
			IContainer child = Container.GetNestedContainer();
			return new StructureMapDependencyResolver(child);
		}
	}
}