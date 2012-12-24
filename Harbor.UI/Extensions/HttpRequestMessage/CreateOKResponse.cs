using System.Net;
using System.Net.Http;

namespace Harbor.UI.Extensions
{
	public static partial class HttpRequestMessageExtensions
	{
		/// <summary>
		/// Returns an HttpResponseMessage with a HttpStatusCode.OK (200).
		/// </summary>
		/// <param name="request"></param>
		/// <returns></returns>
		public static HttpResponseMessage CreateOKResponse(this HttpRequestMessage request)
		{
			return request.CreateResponse(HttpStatusCode.OK);
		}

		/// <summary>
		/// Returns an HttpResponseMessage with a HttpStatusCode.OK (200).
		/// </summary>
		/// <param name="request"></param>
		/// <param name="value"></param>
		/// <returns></returns>
		public static HttpResponseMessage CreateOKResponse<T>(this HttpRequestMessage request, T value)
		{
			return request.CreateResponse(HttpStatusCode.OK, value);
		}
	}
}