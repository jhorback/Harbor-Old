using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Harbor.Domain
{
	/// <summary>
	/// Represents an error caused by a domain rule violation.
	/// </summary>
	public class DomainValidationException : Exception
	{
		public DomainValidationException(string message) : base(message) { }

		public ICollection<ValidationResult> Results { get; set; }
	}
}
