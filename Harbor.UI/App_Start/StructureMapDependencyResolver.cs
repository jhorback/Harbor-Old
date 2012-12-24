using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using StructureMap;

namespace Harbor.UI
{
	public class StructureMapDependencyResolver : IDependencyResolver
	{
		public StructureMapDependencyResolver(IContainer container)
		{
			_container = container;
		}

		public object GetService(Type serviceType)
		{
			try
			{
				if (serviceType.IsAbstract || serviceType.IsInterface)
				{
					return _container.TryGetInstance(serviceType);
				}
				else
				{
					return _container.GetInstance(serviceType);
				}
			}
			catch (StructureMapException)
			{
				return null;
			}
		}

		public IEnumerable<object> GetServices(Type serviceType)
		{
			return _container.GetAllInstances(serviceType).Cast<object>();
		}

		private readonly IContainer _container;
	}
}