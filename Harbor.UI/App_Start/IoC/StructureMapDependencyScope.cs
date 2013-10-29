using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http.Dependencies;
using Microsoft.Practices.ServiceLocation;
using StructureMap;

namespace Harbor.UI.IoC
{
	public class StructureMapDependencyScope : ServiceLocatorImplBase, IDependencyScope
	{
		protected readonly IContainer Container;


        public StructureMapDependencyScope(IContainer container)
        {
            if (container == null)
            {
                throw new ArgumentNullException("container");
            }

            this.Container = container;
        }

   
        public void Dispose()
        {
            this.Container.Dispose();
        }

       
     
        public IEnumerable<object> GetServices(Type serviceType)
        {
            return this.Container.GetAllInstances(serviceType).Cast<object>();
        }

      
        protected override IEnumerable<object> DoGetAllInstances(Type serviceType)
        {
            return this.Container.GetAllInstances(serviceType).Cast<object>();
        }


        protected override object DoGetInstance(Type serviceType, string key)
        {
            if (string.IsNullOrEmpty(key))
            {
                return serviceType.IsAbstract || serviceType.IsInterface
                           ? this.Container.TryGetInstance(serviceType)
                           : this.Container.GetInstance(serviceType);
            }

            return this.Container.GetInstance(serviceType, key);
        }
	}
}