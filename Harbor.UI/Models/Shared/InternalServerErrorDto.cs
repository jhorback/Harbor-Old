
namespace Harbor.UI.Models
{
	public class InternalServerErrorDto
	{
		public InternalServerErrorDto()
		{
			this.message = "An error has occured.";
		}

		public string message { get; set; }
		public string exception { get; set; }
		public string exceptionType { get; set; }
		public string stackTrace { get; set; }
	}
}