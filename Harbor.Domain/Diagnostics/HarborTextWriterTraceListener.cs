using System;
using System.Configuration;
using System.Diagnostics;
using System.IO;

namespace Harbor.Domain.Diagnostics
{
	/// <summary>
	/// Basically used to prepend the date to the standard TextWriterTraceListener
	/// </summary>
	public class HarborTextWriterTraceListener : TextWriterTraceListener
	{
		public HarborTextWriterTraceListener(string fileName)
			: base(mungeFileName(fileName)) { }

		/// <summary>
		/// Munges the file name such that if it is a relative path, we go
		/// relative from the configuration file and not from the current working
		/// directory. This makes things work as expected on ASP.NET sites and
		/// makes other applications similarly work with non-astonishing
		/// behavior.
		/// </summary>
		/// <param name="fileName">the file name to munge</param>
		/// <returns>the munged filename</returns>
		private static string mungeFileName(string fileName)
		{
			string configPath;
			string mungedFileName;

			mungedFileName = fileName;

			if (fileName[0] != Path.DirectorySeparatorChar &&
				fileName[0] != Path.AltDirectorySeparatorChar &&
				!Path.IsPathRooted(fileName))
			{
				ConfigurationSection configSection;

				configSection = (ConfigurationSection)ConfigurationManager
					.GetSection("system.diagnostics");
				if (configSection != null)
				{
					configPath = configSection.ElementInformation.Source;

					if (!string.IsNullOrEmpty(configPath))
					{
						string directoryName;

						directoryName = Path.GetDirectoryName(configPath);

						if (directoryName != null)
						{
							mungedFileName = Path.Combine(
								directoryName,
								fileName);
						}
					}
				}
			}

			return mungedFileName;
		}

		public override void Write(string message)
		{
			base.Write(String.Format("[{0}]:{1}", DateTime.Now, message));
		}

		public override void WriteLine(string message)
		{
			base.WriteLine(String.Format("[{0}]:{1}", DateTime.Now, message));
		}
	}
}
