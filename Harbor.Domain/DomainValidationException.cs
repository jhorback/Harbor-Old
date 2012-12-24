using System;

namespace Harbor.Domain
{
	/// <summary>
	/// Represents an error caused by a domain rule violation.
	/// </summary>
	public class DomainValidationException : Exception
	{
		public DomainValidationException(string message) : base(message)
		{
		}
	}
}
