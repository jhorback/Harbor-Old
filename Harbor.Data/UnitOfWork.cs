using System;
using System.Data.Entity.Validation;
using Harbor.Domain;

namespace Harbor.Data
{
	public class UnitOfWork : IUnitOfWork
	{
		private readonly HarborContext _context;
		private readonly ILogger _logger;

		public UnitOfWork(HarborContext context, ILogger logger)
		{
			_context = context;
			_logger = logger;
		}

		public HarborContext Context
		{
			get { return _context; }
		}

		public void Save()
		{
			try
			{
				_context.SaveChanges();
			}
			catch (DbEntityValidationException dbEx)
			{
				_logger.Error(dbEx);
				foreach (var validationErrors in dbEx.EntityValidationErrors)
				{
					foreach (var validationError in validationErrors.ValidationErrors)
					{
						_logger.Error("Property: {0} Error: {1}", validationError.PropertyName, validationError.ErrorMessage);
					}
				}
				throw new Exception("An validation error occured when saving changes to the database.", dbEx);
			}
			catch (Exception e)
			{
				_logger.Error("UnitOfWork Save Error", e);
				throw new Exception("An error occured when saving changes to the database.", e);
			}
		}
	}
}
