using System;
using System.Web;
using System.Web.Script.Serialization;

namespace Harbor.Domain
{
	public static class JSON
	{
		/// <summary>
		///	Converts the object into a json string.
		/// </summary>
		/// <param name="value">The object to convert.</param>
		/// <param name="encode">An option to url encode the json string.</param>
		/// <returns>The json string.</returns>
		public static string Stringify(object value, bool encode = false)
		{
			JavaScriptSerializer serializer = new JavaScriptSerializer();
			var output = serializer.Serialize(value);
			if (encode)
			{
				output = HttpUtility.UrlEncode(output);
				// UrlEncode encodes spaces to "+", javascript unescape uses %20
				output = output.Replace("+", "%20");
			}
			return output;
		}

		/// <summary>
		///	Parses a string and returns an object.
		/// </summary>
		/// <typeparam name="TType">The type of object.</typeparam>
		/// <param name="json">The json string to parse.</param>
		/// <returns></returns>
		public static TType Parse<TType>(string json)
		{
			if (json == null)
				return default(TType);

			var serializer = new JavaScriptSerializer();
			try
			{
				TType result = serializer.Deserialize<TType>(json);
				return result;
			}
			catch(Exception)
			{
				return default(TType);
			}
		}

		/// <summary>
		///	Parses a string and returns an object.
		/// </summary>
		/// <param name="json">The json string to parse.</param>
		/// <returns></returns>
		public static object Parse(string json)
		{
			return JSON.Parse<object>(json);
		}
	}
}
