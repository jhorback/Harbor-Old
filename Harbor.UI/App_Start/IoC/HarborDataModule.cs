using Autofac;
using Harbor.Data;

namespace Harbor.UI.IoC
{
	// can remove, this was when trying autofac
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