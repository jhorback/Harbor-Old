using System;

namespace Harbor.Domain
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



	public interface IGlobalCache<T>
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

	//public class EventPublisher<T> : IEventPublisher<T>
	
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
