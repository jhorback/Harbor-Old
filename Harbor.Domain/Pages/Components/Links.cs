using System;

namespace Harbor.Domain.Pages.Components
{
	public class Links : AsideComponent
	{
		public const string KEY = "links";

		public override string Key
		{
			get { return Links.KEY; }
		}

		public override string Name
		{
			get
			{
				return "Links";
			}
		}

		public override string Description
		{
			get
			{
				return "Provides links to related documents.";
			}
		}
	}
}
