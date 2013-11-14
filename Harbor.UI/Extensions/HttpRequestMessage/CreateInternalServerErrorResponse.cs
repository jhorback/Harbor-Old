using System;
using System.Net;
using System.Net.Http;
using Harbor.UI.Models;

namespace Harbor.UI.Extensions
{
	public static partial class HttpRequestMessageExtensions
	{
		/// <summary>
		/// Returns an HttpResponseMessage as a HttpStatusCode.InternalServerError (500) with a standardized response for server errors.
		/// </summary>
		/// <param name="request"></param>
		/// <param name="exception"></param>
		/// <returns></returns>
		public static HttpResponseMessage CreateInternalServerErrorResponse(this HttpRequestMessage request, Exception exception)
		{
			var response = getInternalServerErrorResponse(exception);
			return request.CreateResponse(HttpStatusCode.InternalServerError, response);
		}

		/// <summary>
		/// Returns an HttpResponseMessage as a HttpStatusCode.InternalServerError (500) with a standardized response for server errors.
		/// </summary>
		/// <param name="request"></param>
		/// <param name="message"></param>
		/// <param name="exception"></param>
		/// <returns></returns>
		public static HttpResponseMessage CreateInternalServerErrorResponse(this HttpRequestMessage request, string message, Exception exception)
		{
			var response = getInternalServerErrorResponse(exception);
			response.message = message;
			return request.CreateResponse(HttpStatusCode.InternalServerError, response);
		}

		private static InternalServerErrorDto getInternalServerErrorResponse(Exception exception)
		{
			var response = new InternalServerErrorDto
			{
				exception = exception.Message,
				exceptionType = exception.GetType().FullName
			};
#if DEBUG
			response.stackTrace = exception.StackTrace;
#endif
			return response;
		}
	}
}