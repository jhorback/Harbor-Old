using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Harbor.UI.Models
{
	public class NotFoundDto
	{
		public NotFoundDto()
		{
			this.message = "The resource was not found.";
		}

		public string message { get; set; }
	}
}