using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using Harbor.Domain.App;
using Harbor.Domain.Files;
using Harbor.Domain.Pages;
using Harbor.Domain.Security;

namespace Harbor.Data
{
	/*  http://msdn.microsoft.com/en-US/data/jj591621
	 *  
	 *  Add-Migration <FriendlyName> -StartupProjectName "Harbor.Data"
	 *      - Will scaffold the next migration based on changes you have made to your model.
	 *      - Use -Force to recreate the migration.
	 *	Update-Database -TargetMigration <FriendlyName> -StartupProjectName "Harbor.Data" -Verbose
	 *	    - Will apply any pending changes to the database.
	 *	
	 */
	public class HarborContext : DbContext
	{
		public DbSet<AppSetting> AppSettings { get; set; }
		public DbSet<User> Users { get; set; }
		public DbSet<UserRole> UserRoles { get; set; }
		public DbSet<UserSetting> UserSettings { get; set; }
		public DbSet<PageProperty> PageProperties { get; set; }
		public DbSet<Page> Pages { get; set; }
		public DbSet<PageRole> PageRoles { get; set; }
		public DbSet<File> Files { get; set; }


		protected override void OnModelCreating(DbModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			modelBuilder.Configurations.Add<Page>(new DbSetConfiguration.PageConfiguration());
			modelBuilder.Configurations.Add<User>(new DbSetConfiguration.UserConfiguration());
			// modelBuilder.Configurations.Add<File>(new DbSetConfiguration.FileConfiguration());
		}
	}

	public class DbSetConfiguration
	{
		public class PageConfiguration : EntityTypeConfiguration<Page>
		{
			public PageConfiguration()
			{
				HasOptional(m => m.Parent).WithMany().HasForeignKey(m => m.ParentPageID);
				HasRequired(m => m.Author).WithMany().HasForeignKey(m => m.AuthorsUserName);
				HasMany(m => m.PageRoles)
					.WithRequired()
					.HasForeignKey(dr => dr.PageID)
					.WillCascadeOnDelete();
				HasMany(m => m.Properties)
					.WithRequired()
					.HasForeignKey(dp => dp.PageID)
					.WillCascadeOnDelete();
				HasOptional(m => m.PreviewImage).WithMany().HasForeignKey(m => m.PreviewImageID);
				Ignore(m => m.Template);
			}
		}

		public class UserConfiguration : EntityTypeConfiguration<User>
		{
			public UserConfiguration()
			{
				HasMany(m => m.UserRoles)
					.WithRequired()
					.HasForeignKey(r => r.UserName)
					.WillCascadeOnDelete();

				Ignore(m => m.DisplayName);

			}
		}

		public class FileConfiguration : EntityTypeConfiguration<File>
		{
			public FileConfiguration()
			{
				HasRequired(m => m.Owner).WithMany().HasForeignKey(m => m.UserName).WillCascadeOnDelete();
				// Property(p => p.ResolutionsCreated).HasColumnName("ResolutionsCreated");
			}
		}
	}
}
