using System.ComponentModel.DataAnnotations;

namespace Harbor.Domain.DataAnnotations
{
	/// <summary>
	/// Specifies that the data field value is a valid email address.
	/// </summary>
	public class EmailAttribute : RegularExpressionAttribute
	{
		string errorMessage = "{0} needs to be a valid email message.";

		public EmailAttribute()
			: base(@"^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}" +
				   @"\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\" +
				   @".)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$") { }


		public new string ErrorMessage
		{
			get
			{
				return errorMessage;
			}
			set
			{
				errorMessage = value;
			}
		}

		public override string FormatErrorMessage(string name)
		{
		    return string.Format(this.ErrorMessage, name);
		}
	} 
}
