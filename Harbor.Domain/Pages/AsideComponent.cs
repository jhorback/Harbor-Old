﻿
namespace Harbor.Domain.Pages
{
	/// <summary>
	/// Defines a component that can be added as tangential content of a document.
	/// </summary>
	public abstract class AsideComponent : PageComponentType
	{
		public override string Type { get { return "aside"; } }
	}
}
