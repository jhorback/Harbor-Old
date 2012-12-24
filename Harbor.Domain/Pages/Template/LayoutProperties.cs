using System;

namespace Harbor.Domain.Pages
{
	[Flags]
	public enum LayoutProperties
	{
		None = 0,
		ContentReadable = 1,
		ContentCentered = 2,
		NoAside = 4
	}
}
