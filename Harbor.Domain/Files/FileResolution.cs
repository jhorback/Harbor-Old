using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Harbor.Domain.Files
{
	[Flags]
	public enum FileResolution
	{
		Original = 1,
		Low = 2,
		High = 4
	}

	/// <summary>
	/// Extensions for dealing with the <see cref="FileResolution"/> enumeration.
	/// </summary>
	public static class FileResolutionExtensions
	{
		/// <summary>
		/// Easy way to add a supported resolution.
		/// </summary>
		/// <param name="currentRes"></param>
		/// <param name="res"></param>
		/// <returns></returns>
		public static FileResolution AddRes(this FileResolution currentRes, FileResolution res)
		{
			return currentRes | res;
		}

		/// <summary>
		/// Returns true if res is supported. Simply calls HasFlag.
		/// </summary>
		/// <param name="currentRes"></param>
		/// <param name="res"></param>
		/// <returns></returns>
		public static bool HasRes(this FileResolution currentRes, FileResolution res)
		{
			return currentRes.HasFlag(res);
		}
	}
}
