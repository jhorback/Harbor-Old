using System;
using System.Runtime.Caching;
using System.Security.Principal;


namespace Harbor.Domain
{
	public class MemCache : IMemCache
	{
		private readonly IPrincipal _user;

		public MemCache(IPrincipal user)
		{
			_user = user;
		}


		public T Get<T>(object key)
		{
			return get<T>(getUserKey<T>(key));
		}

		public T GetGlobal<T>(object key)
		{
			return get<T>(getGlobalKey<T>(key));
		}

		public void Set<T>(object key, T value, DateTimeOffset expiration)
		{
			set<T>(getUserKey<T>(key), value, expiration);
		}

		public void SetGlobal<T>(object key, T value, DateTimeOffset expiration)
		{
			set<T>(getGlobalKey<T>(key), value, expiration);
		}

		public void Bust<T>(object key)
		{
			MemoryCache.Default.Remove(getUserKey<T>(key));
		}

		public void BustGlobal<T>(object key)
		{
			MemoryCache.Default.Remove(getGlobalKey<T>(key));
		}


		// generate a unique key per user/type/key
		public string getUserKey<T>(object key)
		{
			return string.Format("{{user: {0}, type: {1}, key: {2}}}", _user.Identity.Name, typeof(T), key);
		}

		// generate a unique key per type/key
		public string getGlobalKey<T>(object key)
		{
			return string.Format("{{type: {0}, key: {1}}}", typeof(T), key);
		}

		private T get<T>(string key)
		{
			var ret = MemoryCache.Default.Get(key);
			return ret == null ? default(T) : (T)ret;
		}

		private void set<T>(string key, T value, DateTimeOffset expiration)
		{
			MemoryCache.Default.Set(key, value, expiration);
		}
	}
}
