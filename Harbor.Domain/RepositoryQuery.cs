using System;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;

namespace Harbor.Domain
{
	public class RepositoryQuery<T>
	{
		public int? Take { get; set; }
		public int? Skip { get; set; }
		public string Order { get; set; }
		public string OrderDesc { get; set; }

		public IQueryable<T> Query(IQueryable<T> queryable)
		{
			if (Take != null)
				queryable = queryable.Take(Take ?? 100);
			if (Skip != null)
				queryable = queryable.Skip(Skip ?? 0);
			if (Order != null)
				queryable = ApplyOrder(queryable, Order, "OrderBy");
			if (OrderDesc != null)
				queryable = ApplyOrder(queryable, OrderDesc, "OrderByDescending");
			return queryable;
		}

		IOrderedQueryable<T> ApplyOrder(IQueryable<T> source, string property, string methodName)
		{
			string[] props = property.Split('.');
			Type type = typeof(T);
			ParameterExpression arg = Expression.Parameter(type, "x");
			Expression expr = arg;
			foreach (string prop in props)
			{
				// use reflection (not ComponentModel) to mirror LINQ
				PropertyInfo pi = type.GetProperty(prop);
				expr = Expression.Property(expr, pi);
				type = pi.PropertyType;
			}
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
