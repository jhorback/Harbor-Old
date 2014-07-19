using System;

namespace Harbor.Domain.Pages
{
	/// <summary>
	/// Defines a component that can be added as content of a document.
	/// </summary>
	public abstract class TemplateContentType : ContentType
	{
		public abstract string Name { get; }
		public abstract string Description { get; }
		[Obsolete("Using the HandlerType and DataType to provide this via a load handler.")]
		public abstract Type PageComponent { get; }
	}
}
