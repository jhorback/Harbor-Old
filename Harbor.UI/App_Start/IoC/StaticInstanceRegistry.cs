﻿using System.Security.Principal;
using System.Web;
using StructureMap.Configuration.DSL;

namespace Harbor.UI.IoC
{
	public class StaticInstanceRegistry : Registry
	{
		public StaticInstanceRegistry()
		{
			For<IPrincipal>().Use(c => HttpContext.Current.User);
		}
	}
}