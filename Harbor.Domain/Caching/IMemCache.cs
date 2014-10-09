using System;

namespace Harbor.Domain.Caching
{
	public interface IMemCache
	{
		T Get<T>(object key);
		T GetGlobal<T>(object key);
		void Set<T>(object key, T value, DateTimeOffset expiration);
		void SetGlobal<T>(object key, T value, DateTimeOffset expiration);
		void Bust<T>(object key);
		void BustGlobal<T>(object key);
	}
}
