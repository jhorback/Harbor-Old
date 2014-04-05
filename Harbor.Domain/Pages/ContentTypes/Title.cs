﻿using System;

namespace Harbor.Domain.Pages.Components
{
	public class Title : HeaderComponent
	{
		public const string KEY = "title";

		public override string Key
		{
			get { return KEY; }
		}

		public override string Name
		{
			get
			{
				return "Title";
			}
		}

		public override string Description
		{
			get
			{
				return "The standard document title.";
			}
		}

		public override Type PageComponent
		{
			get { return null; }
		}
	}
}