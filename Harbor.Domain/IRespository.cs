using System;
using System.Collections.Generic;
using System.Linq;

namespace Harbor.Domain
{
	public interface IRepository<T> where T : IAggregateRoot
	{
		IEnumerable<T> FindAll(Func<T, bool> filter = null);

		IQueryable<T> Query();

		T FindById(object id);

		T Create(T entity);

		T Update(T entity);

		void Delete(T entity);

		void Save();
	}
}

