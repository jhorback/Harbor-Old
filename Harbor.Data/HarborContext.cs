using System.Data.Entity;
using System.Data.Entity.ModelConfiguration;
using Harbor.Domain.App;
using Harbor.Domain.Files;
using Harbor.Domain.Pages;
using Harbor.Domain.Products;
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
		public HarborContext()
		{
		}

		public DbSet<AppSetting> AppSettings { get; set; }
		public DbSet<User> Users { get; set; }
		public DbSet<UserRole> UserRoles { get; set; }
		public DbSet<UserSetting> UserSettings { get; set; }
		public DbSet<PageProperty> PageProperties { get; set; }
		public DbSet<Page> Pages { get; set; }
		public DbSet<PageRole> PageRoles { get; set; }
		public DbSet<File> Files { get; set; }
		public DbSet<PayPalButton> PayPalButtons { get; set; }
		public DbSet<PageLayout> PageLayouts { get; set; }


		protected override void OnModelCreating(DbModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			modelBuilder.Configurations.Add<Page>(new DbSetConfiguration.PageConfiguration());
			modelBuilder.Configurations.Add<PageLayout>(new DbSetConfiguration.PageLayoutConfiguration());
			modelBuilder.Configurations.Add<User>(new DbSetConfiguration.UserConfiguration());
			modelBuilder.Configurations.Add<File>(new DbSetConfiguration.FileConfiguration());
			modelBuilder.Configurations.Add<PayPalButton>(new DbSetConfiguration.PayPalButtonConfiguration());
		}
	}

	public class DbSetConfiguration
	{
		public class PageConfiguration : EntityTypeConfiguration<Page>
		{
			public PageConfiguration()
			{
				HasRequired(m => m.Author).WithMany().HasForeignKey(m => m.AuthorsUserName);
				HasOptional(m => m.Layout).WithMany().HasForeignKey(m => m.PageLayoutID);
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
				Ignore(m => m.VirtualPath);
				Ignore(m => m.PageType);
				Ignore(m => m.IsARootPage);
				Ignore(m => m.RootPageUrl);

				HasMany(m => m.Files).WithMany();
				HasMany(m => m.PageLinks).WithMany();
				HasMany(m => m.PayPalButtons).WithMany();
			}
		}

		public class PageLayoutConfiguration : EntityTypeConfiguration<PageLayout>
		{
			public PageLayoutConfiguration()
			{
				HasRequired(m => m.Owner)
					.WithMany()
					.HasForeignKey(m => m.UserName)
					.WillCascadeOnDelete(false);

				Ignore(m => m.HeaderData);
				Ignore(m => m.AsideData);
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
				Ignore(m => m.NewPassword);
				Ignore(m => m.CurrentPassword);
			}
		}

		public class FileConfiguration : EntityTypeConfiguration<File>
		{
			public FileConfiguration()
			{
				// when deleting a user, will need to delete the files manually first
				// this is to avoid the cyclical reference
				// Users x-> Page x-> PageFiles
				// Users x-> Files x-> PageFiles
				HasRequired(m => m.Owner)
					.WithMany()
					.HasForeignKey(m => m.UserName)
					.WillCascadeOnDelete(false);
			}
		}

		public class PayPalButtonConfiguration : EntityTypeConfiguration<PayPalButton>
		{
			public PayPalButtonConfiguration()
			{
				HasRequired(m => m.Owner)
					.WithMany()
					.HasForeignKey(m => m.UserName)
					.WillCascadeOnDelete(false);
			}
		}
	}
}
