using Autofac;
using Autofac.Integration.Mvc;
using Autofac.Integration.WebApi;
using Harbor.Data;

namespace Harbor.UI.AutofacModules
{
	public class HarborDataModule : Module
	{
		protected override void Load(ContainerBuilder builder)
		{
			builder.RegisterType<HarborContext>().AsSelf()
				.InstancePerLifetimeScope()
				//.InstancePerHttpRequest()
				;
		}
	}
}