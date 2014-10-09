using System;

namespace Harbor.Domain
{
	public class GlobalCache<T> : IGlobalCache<T>
	{
		private readonly IMemCache _memCache;

		public GlobalCache(IMemCache memCache)
		{
			_memCache = memCache;
		}

		public T Get(object key)
		{
			return _memCache.GetGlobal<T>(key);
		}

		public T Get()
		{
			return Get("");
		}

		public void Set(object key, T value, DateTimeOffset expiration)
		{
			_memCache.SetGlobal(key, value, expiration);
		}

		public void Set(object key, T value)
		{
			Set(key, value, DateTime.Now.AddHours(1));
		}

		public void Set(T value, DateTimeOffset expiration)
		{
			Set("", value, expiration);
		}

		public void Set(T value)
		{
			Set("", value);
		}

		public void Remove(object key)
		{
			_memCache.BustGlobal<T>(key);
		}

		public void Remove()
		{
			Remove("");
		}
	}
}
