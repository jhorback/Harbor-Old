using Harbor.Domain;
using Harbor.Domain.Diagnostics;
using StructureMap.Configuration.DSL;

namespace Harbor.UI.IoC
{
	public class LoggerRegistry : Registry
	{
		public LoggerRegistry()
		{
			For<ILogger>().Use(c => new Logger(c.ParentType));
		}
	}
}