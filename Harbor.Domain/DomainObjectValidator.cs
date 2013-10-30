using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;

namespace Harbor.Domain
{
	/// <summary>
	/// Captures data annotation validation errors and any results from an IValidatableObject
	/// </summary>
	public class DomainObjectValidator
	{
		/// <summary>
		/// Returns the collection of member names and error messages on the current model state.
		/// This will be an empty collection if valid.
		/// </summary>
		/// <param name="object"></param>
		/// <returns></returns>
		public static ICollection<ValidationResult> Validate(object @object)
		{
			var context = new ValidationContext(@object, serviceProvider: null, items: null);
			var results = new List<ValidationResult>();
			Validator.TryValidateObject(
				@object, context, results,
				validateAllProperties: true
			);
			return results;
		}

		/// <summary>
		/// Returns true of the object is valid.
		/// </summary>
		/// <param name="object"></param>
		/// <returns></returns>
		public static bool IsValid(object @object)
		{
			var results = Validate(@object);
			return results.Count == 0;
		}

		/// <summary>
		/// Throws a detailed error if the object is not valid.
		/// Can be used by repositories as a last check.
		/// </summary>
		/// <param name="object"></param>
		public static void ThrowIfInvalid(object @object)
		{
			var results = Validate(@object);
			if (results.Count > 0)
			{
				throw new DomainValidationException(getErrorMessage(results)) {Results = results};
			}
		}

		private static string getErrorMessage(ICollection<ValidationResult> results)
		{
			var message = new StringBuilder();
			foreach (var result in results)
			{
				message.Append(string.Join(", ", result.MemberNames));
				message.Append(": \n");
				message.Append(result.ErrorMessage);
				message.Append("\n\n");
			}
			return message.ToString();
		}
	}
}
