using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Caching;
using System.Web;
using Harbor.Domain;
using Harbor.Domain.Files;
using File = Harbor.Domain.Files.File;

namespace Harbor.Data.Repositories
{
	public class FileRepository : IFileRepository
	{
		HarborContext context;
		IFileFactory fileFactory;
		private readonly ILogger _logger;

		public FileRepository(HarborContext context, IFileFactory fileFactory, ILogger logger)
		{
			this.context = context;
			this.fileFactory = fileFactory;
			_logger = logger;
		}

		public IEnumerable<File> FindAll(Func<File, bool> filter = null)
		{
			return filter == null ?
				Query().AsEnumerable()
				:
				Query().Where(filter).AsEnumerable();
		}

		public IEnumerable<File> FindAll(FileQuery fileQuery)
		{
			return fileQuery.Query(Query());
		}

		public IQueryable<File> Query()
		{
			return context.Files.AsQueryable();
		}

		public File FindById(object id)
		{
			_logger.Info("FindById: {0}", id);
			Guid guid;
			Guid.TryParse(id.ToString(), out guid);
			var file = findCachedFileByID(guid);
			if (file == null)
			{
				_logger.Info("FindById: {0} - File Not Found", id);
			}
			else
			{
				_logger.Info("FindById: {0} - File Found: {1}", id, file);
			}
			return file;
		}

		public File FindById(object id, bool readOnly)
		{
			var guid = Guid.Parse(id.ToString());
			if (readOnly)
				return findCachedFileByID(guid);
			return findFileByID(guid);
		}

		public File Create(string userName, HttpPostedFileBase uploadedFile)
		{
			var file = fileFactory.CreateFile(userName, uploadedFile);
			return Create(file);
		}

		public File Create(File file)
		{
			DomainObjectValidator.ThrowIfInvalid(file);
			file = context.Files.Add(file);
			try
			{
				context.SaveChanges();
			}
			catch (Exception e)
			{
				_logger.Fatal("Create file failed.", e);
			}
			return file;
		}

		public File Update(File entity)
		{
			var entry = context.Entry(entity);
			if (entry.State == System.Data.EntityState.Detached)
				throw new InvalidOperationException("The entitiy was in a detached state.");

			DomainObjectValidator.ThrowIfInvalid(entity);

			try
			{
				context.SaveChanges();
			}
			catch (Exception e)
			{
				_logger.Fatal("Update file failed.", e);
			}
			clearCachedFileByID(entity.FileID);
			return entity;
		}

		public void Delete(File entity)
		{
			if (context.Entry(entity).State == System.Data.EntityState.Detached)
			{
				context.Files.Attach(entity);
			}

			deletePhysicalFile(entity, FileResolution.Original);
			deletePhysicalFile(entity, FileResolution.Low);
			deletePhysicalFile(entity, FileResolution.High);
			
			clearCachedFileByID(entity.FileID);
			context.Files.Remove(entity);
			try
			{
				context.SaveChanges();
			}
			catch (Exception e)
			{
				_logger.Fatal("Delete file failed.", e);
			}
		}

		private void deletePhysicalFile(File file, FileResolution res)
		{
			var path = file.GetPhysicalPath(res);
			// jch - could throw an error - let this bubble (at least for now) 
			if (System.IO.File.Exists(path))
				System.IO.File.Delete(path);
		}

		#region private
		string fileCacheKey = "Harbor.Data.Repositories.FileRepository.";

		void clearCachedFileByID(Guid fileID)
		{
			var cacheKey = fileCacheKey + fileID;
			MemoryCache.Default.Remove(cacheKey);
		}

		File findCachedFileByID(Guid fileID)
		{
			var cacheKey = fileCacheKey + fileID;
			var file = MemoryCache.Default.Get(cacheKey) as File;
			if (file == null)
			{
				file = findFileByID(fileID);
				if (file != null)
				{
					MemoryCache.Default.Set(cacheKey, file, DateTime.Now.AddSeconds(10));
				}
			}
			return file;
		}

		File findFileByID(Guid fileID)
		{
			File file = FindAll(d => d.FileID == fileID).FirstOrDefault();
			return file;
		}
		#endregion
	}
}
