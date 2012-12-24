using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace Common.UI.Models.App
{
	public static class TypeFinder
	{
		public static List<T> GetImplementations<T>()
		{
			return (from t in Assembly.GetExecutingAssembly().GetTypes()
					where t.GetInterfaces().Contains(typeof(T)) && t.GetConstructor(Type.EmptyTypes) != null
					select (T)Activator.CreateInstance(t)).ToList();
		}

		public static IList<T> GetInstances<T>()
		{
			return (from t in Assembly.GetExecutingAssembly().GetTypes()
					where t.BaseType == (typeof(T)) && t.GetConstructor(Type.EmptyTypes) != null
					select (T)Activator.CreateInstance(t)).ToList();
		}
	}
}