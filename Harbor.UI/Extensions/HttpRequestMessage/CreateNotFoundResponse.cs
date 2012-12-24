using System.Net;
using System.Net.Http;
using Harbor.UI.Models;

namespace Harbor.UI.Extensions
{
	public static partial class HttpRequestMessageExtensions
	{
		/// <summary>
		/// Returns an HttpResponseMessage as a HttpStatusCode.NotFound (404) with a standardized response for resources not found.
		/// </summary>
		/// <param name="request"></param>
		/// <returns></returns>
		public static HttpResponseMessage CreateNotFoundResponse(this HttpRequestMessage request)
		{
			var response = new NotFoundDto();
			return request.CreateResponse(HttpStatusCode.NotFound, response);
		}

		/// <summary>
		/// Returns an HttpResponseMessage as a HttpStatusCode.NotFound (404) with a standardized response for resources not found.
		/// </summary>
		/// <param name="request"></param>
		/// <param name="message"></param>
		/// <returns></returns>
		public static HttpResponseMessage CreateNotFoundResponse(this HttpRequestMessage request, string message)
		{
			var response = new NotFoundDto();
			response.message = message;
			return request.CreateResponse(HttpStatusCode.InternalServerError, response);
		}
	}
}