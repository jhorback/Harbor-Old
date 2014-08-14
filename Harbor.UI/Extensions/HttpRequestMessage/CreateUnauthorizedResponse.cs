using System;
using System.Net;
using System.Net.Http;

namespace Harbor.UI.Extensions
{
	public static partial class HttpRequestMessageExtensions
	{
		public static HttpResponseMessage CreateUnauthorizedResponse(this HttpRequestMessage request)
		{
			return request.CreateUnauthorizedResponse("Unauthorized access to resource.");
		}

		public static HttpResponseMessage CreateUnauthorizedResponse(this HttpRequestMessage request, string message)
		{
			if (string.IsNullOrEmpty(message))
				return request.CreateUnauthorizedResponse();
			return request.CreateResponse(HttpStatusCode.Unauthorized, new { message = message });
		}

		public static HttpResponseMessage CreateUnauthorizedResponse(this HttpRequestMessage request, UnauthorizedAccessException exception)
		{
			return request.CreateResponse(HttpStatusCode.Unauthorized, new { message = exception.Message });

		}
	}
}