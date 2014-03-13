using System;

namespace Harbor.Domain
{
	public interface IObjectFactory
	{
		T GetInstance<T>();
		object GetInstance(Type type);
	}
}
