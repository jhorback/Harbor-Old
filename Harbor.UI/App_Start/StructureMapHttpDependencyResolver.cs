using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Dependencies;
using StructureMap;

namespace Harbor.UI
{
	public class StructureMapHttpDependencyResolver : StructureMapHttpDependencyScope, IDependencyResolver
	{
		private IContainer _container;

		public StructureMapHttpDependencyResolver(IContainer container)
			: base(container)
		{
			_container = container;
		}

		public IDependencyScope BeginScope()
		{
			_container = IoCConfig.Initialize();
			return new StructureMapHttpDependencyScope(_container);
		}
	}
}