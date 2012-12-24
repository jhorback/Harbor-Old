using System.Collections.Generic;

namespace Harbor.UI.Models
{
	/// <summary>
	/// A structure used passing client errors to the client.
	/// </summary>
	public class BadRequestDto
	{
		public BadRequestDto()
		{
			this.message = "The request is invalid.";
		}

		public string message { get; set; }

		public Dictionary<string, List<string>> errors { get; set; }
	}
}