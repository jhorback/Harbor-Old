using System;

namespace Harbor.Domain
{
	public interface IUserCache<T>
	{
		T Get(object key);
		T Get();
		void Set(object key, T value);
		void Set(object key, T value, DateTimeOffset expiration);
		void Set(T value, DateTimeOffset expiration);
		void Set(T value);
		void Remove(object key);
		void Remove();
	}

}
