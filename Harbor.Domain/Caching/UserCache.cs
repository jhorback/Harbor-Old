using System;
using System.Collections.Generic;

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
			addToKeys(key);
			_memCache.Set(key, value, expiration);
		}

		public void Set(object key, T value)
		{
			Set(key, value, DateTime.Now.AddMonths(1));
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
			removeAll();
		}

		public void RemoveAll()
		{
			removeAll();
		}

		void addToKeys(object key)
		{
			var keysKey = typeof(T) + ":KEYS";
			var keyStr = key.ToString();
			var keys = _memCache.Get<List<string>>(keysKey) ?? new List<string>();
			if (keys.Contains(keyStr) == false)
			{
				keys.Add(keyStr);
			}
			_memCache.Set(keysKey, keys, DateTime.Now.AddMonths(1));
		}

		void removeAll()
		{
			var keysKey = typeof(T) + ":KEYS";
			var keys = _memCache.Get<List<string>>(keysKey) ?? new List<string>();
			foreach (var key in keys)
			{
				Remove(key);
			}
			Remove("");
			_memCache.Bust<List<string>>(keysKey);
		}
	}
}
