using System;

namespace Harbor.Domain.Pages
{
	public abstract class ContentType
	{
		/// <summary>
		/// Uses the lowercase class name of the content type as the key.
		/// </summary>
		public string Key
		{
			get
			{
				return GetType().Name.ToLower();
			}
		}
		public abstract Type HandlerType { get; }
		public abstract Type DataType { get; }
	}
}
