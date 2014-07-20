using System;
using System.Collections.Generic;

namespace Harbor.Domain
{
	public interface IObjectFactory
	{
		T GetInstance<T>();
		T GetInstance<T>(object args) where T : class;
		object GetInstance(Type type);
		object GetInstance(Type type, object args);
	}
}
