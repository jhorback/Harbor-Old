using System;

namespace Harbor.Domain.Caching
{
	public class UserCache<T> : IUserCache<T>
	{
		private readonly IMemCache _memCache;

		public UserCache(IMemCache memCache)
		{
			_memCache = memCache;
		}

		public T Get(object key)
		{
			return _memCache.Get<T>(key);
		}

		public T Get()
		{
			return Get("");
		}

		public void Set(object key, T value, DateTimeOffset expiration)
		{
			_memCache.Set(key, value, expiration);
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
			_memCache.Bust<T>(key);
		}

		public void Remove()
		{
			Remove("");
		}
	}
}
