using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Autofac;
using Autofac.Core;
using Harbor.Domain;

namespace Harbor.UI.AutofacModules
{
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