using System;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;

namespace Harbor.Domain
{
	public delegate IQueryable<T> QueryAdjustment<T>(IQueryable<T> queryable);
 
	public class RepositoryQuery<T>
	{
		public RepositoryQuery()
		{
		}

		public RepositoryQuery(QueryAdjustment<T> startingQuery = null)
		{
			StartingQuery = startingQuery;
		}

		public int? Take { get; set; }
		public int? Skip { get; set; }
		public string Order { get; set; }
		public string OrderDesc { get; set; }
		public QueryAdjustment<T> StartingQuery { get; set; }

		/// <summary>
		/// Sorts and pages
		/// </summary>
		/// <param name="queryable"></param>
		/// <returns></returns>
		public IQueryable<T> Query(IQueryable<T> queryable)
		{
			queryable = Sort(queryable);
			queryable = Page(queryable);
			return queryable;
		}

		public IQueryable<T> Sort(IQueryable<T> queryable)
		{
			if (StartingQuery != null)
				queryable = StartingQuery(queryable);

			if (Order != null)
				queryable = ApplyOrder(queryable, Order, "OrderBy");
			if (OrderDesc != null)
				queryable = ApplyOrder(queryable, OrderDesc, "OrderByDescending");

			return queryable;
		}

		public IQueryable<T> Page(IQueryable<T> queryable)
		{
			if (Skip != null && Skip != 0)
				queryable = queryable.Skip(Skip ?? 0);
			if (Take != null)
				queryable = queryable.Take(Take ?? 0);
			return queryable;
		}

		IOrderedQueryable<T> ApplyOrder(IQueryable<T> source, string property, string methodName)
		{
			string[] props = property.Split('.');
			Type type = typeof(T);
			ParameterExpression arg = Expression.Parameter(type, "x");
			Expression expr = arg;
			bool foundProp = false;
			foreach (string prop in props)
			{
				// use reflection (not ComponentModel) to mirror LINQ
				PropertyInfo pi = type.GetProperty(prop, BindingFlags.SetProperty | BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
				if (pi == null) // have invalid column/property name
					continue;
				foundProp = true;
				expr = Expression.Property(expr, pi);
				type = pi.PropertyType;
			}
			
			if (!foundProp) // could not find the property
				return (IOrderedQueryable<T>)source;

			Type delegateType = typeof(Func<,>).MakeGenericType(typeof(T), type);
			LambdaExpression lambda = Expression.Lambda(delegateType, expr, arg);

			object result = typeof(Queryable).GetMethods().Single(
					method => method.Name == methodName
							&& method.IsGenericMethodDefinition
							&& method.GetGenericArguments().Length == 2
							&& method.GetParameters().Length == 2)
					.MakeGenericMethod(typeof(T), type)
					.Invoke(null, new object[] { source, lambda });
			return (IOrderedQueryable<T>)result;
		}
	}
}
