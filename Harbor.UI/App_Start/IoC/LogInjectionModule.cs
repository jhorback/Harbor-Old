using System.Linq;
using Autofac;
using Autofac.Core;
using Harbor.Domain;
using Harbor.Domain.Diagnostics;

namespace Harbor.UI.IoC
{
	// can remove, this was when trying autofac
	public class LogInjectionModule : Module
	{
		protected override void AttachToComponentRegistration(IComponentRegistry registry, IComponentRegistration registration)
		{
			registration.Preparing += OnComponentPreparing;
		}

		static void OnComponentPreparing(object sender, PreparingEventArgs e)
		{
			var t = e.Component.Activator.LimitType;
			e.Parameters = e.Parameters.Union(new[]
			{
				new ResolvedParameter((p, i) => p.ParameterType == typeof(ILogger), (p, i) => new Logger(t))
			});
		}
	}
}