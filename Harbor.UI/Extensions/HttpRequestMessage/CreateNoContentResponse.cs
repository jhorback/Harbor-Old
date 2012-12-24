using System.Net;
using System.Net.Http;

namespace Harbor.UI.Extensions
{
	public static partial class HttpRequestMessageExtensions
	{
		/// <summary>
		/// Returns an HttpResponseMessage with a HttpStatusCode.OK (204).
		/// Use for deletes if not returning the item deleted.
		/// </summary>
		/// <param name="request"></param>
		/// <returns></returns>
		public static HttpResponseMessage CreateNoContentResponse(this HttpRequestMessage request)
		{
			return request.CreateResponse(HttpStatusCode.NoContent);
		}
	}
}