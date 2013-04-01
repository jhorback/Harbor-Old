
using System;

namespace Harbor.Domain.Pages
{
	/// <summary>
	/// Defines a component that can be added to a document.
	/// </summary>
	public abstract class ComponentType
	{
		public abstract string Key { get; }
		public abstract string Type { get; }
		public abstract string Name { get; }
		public abstract string Description { get; }
		public abstract Type PageComponent { get; }
	}
}
