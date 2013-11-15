using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Harbor.Domain
{
	/// <summary>
	/// Represents an error caused by a domain rule violation.
	/// </summary>
	public class DomainValidationException : Exception
	{
		public DomainValidationException(string message) : base(message)
		{
			Results = new List<ValidationResult> { new ValidationResult(message) };
		}

		public DomainValidationException(ICollection<ValidationResult> results)
			: base(getErrorMessage(results))
		{
			Results = results;
		}

		public ICollection<ValidationResult> Results { get; set; }


		private static string getErrorMessage(IEnumerable<ValidationResult> results)
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
