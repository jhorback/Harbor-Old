using System;
using System.Collections.Generic;

namespace Harbor.Domain
{
	public interface IObjectFactory
	{
		T GetInstance<T>();
		T GetInstanceWithArgs<T>(IDictionary<string, object> args);
		object GetInstance(Type type);
		object GetInstanceWithArgs(Type type, IDictionary<string, object> arg);
	}
}
