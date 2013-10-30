using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Net.Http;
using Harbor.Domain;
using Harbor.UI.Models;

namespace Harbor.UI.Extensions
{
	public static partial class HttpRequestMessageExtensions
	{
		/// <summary>
		/// Returns an HttpResponseMessage as a HttpStatusCode.BadRequest (400) with a standardized response for validation errors.
		/// </summary>
		/// <param name="request"></param>
		/// <param name="domainValidationException"></param>
		/// <returns></returns>
		public static HttpResponseMessage CreateBadRequestResponse(this HttpRequestMessage request, DomainValidationException domainValidationException)
		{
			return request.CreateBadRequestResponse(domainValidationException.Message, domainValidationException.Results);
		}

		/// <summary>
		/// Returns an HttpResponseMessage as a HttpStatusCode.BadRequest (400) with a standardized response for validation errors.
		/// </summary>
		/// <param name="request"></param>
		/// <param name="validationErrors"></param>
		/// <returns></returns>
		public static HttpResponseMessage CreateBadRequestResponse(this HttpRequestMessage request, IEnumerable<ValidationResult> validationErrors)
		{
			var response = getBadRequestResponse(validationErrors);
			return request.CreateResponse(HttpStatusCode.BadRequest, response);
		}

		/// <summary>
		/// Returns an HttpResponseMessage as a HttpStatusCode.BadRequest (400) with a standardized response for validation errors.
		/// </summary>
		/// <param name="request"></param>
		/// <param name="message"></param>
		/// <param name="validationErrors"></param>
		/// <returns></returns>
		public static HttpResponseMessage CreateBadRequestResponse(this HttpRequestMessage request, string message, IEnumerable<ValidationResult> validationErrors)
		{
			var response = getBadRequestResponse(validationErrors);
			response.message = message;
			return request.CreateResponse(HttpStatusCode.BadRequest, response);
		}

		/// <summary>
		/// Returns an HttpResponseMessage as a HttpStatusCode.BadRequest (400) with a standardized response for validation errors.
		/// </summary>
		/// <param name="request"></param>
		/// <param name="message">A general error message.</param>
		/// <returns></returns>
		public static HttpResponseMessage CreateBadRequestResponse(this HttpRequestMessage request, string message)
		{
			var errors = new Dictionary<string, List<string>>();
			errors.Add("", new List<string>(new [] { message }));
			var response = new BadRequestDto { errors = errors };
			return request.CreateResponse(HttpStatusCode.BadRequest, response);
		}

		private static BadRequestDto getBadRequestResponse(IEnumerable<ValidationResult> validationErrors)
		{
			var errors = new Dictionary<string, List<string>>();
			if (validationErrors != null)
			{
				foreach (var result in validationErrors)
				{
					var memeberCount = 0;
					foreach (var member in result.MemberNames)
					{
						memeberCount++;
						addError(member, result.ErrorMessage, errors);
					}

					if (memeberCount == 0)
						addError("", result.ErrorMessage, errors);
				}
			}
			return new BadRequestDto { errors = errors };
		}


		private static void addError(string key, string value, Dictionary<string, List<string>> errors)
		{
			if (errors.ContainsKey(key) == false)
				errors[key] = new List<string>();
			errors[key].Add(value);
		}
	}
}