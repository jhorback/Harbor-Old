using System;
using System.Diagnostics;


namespace Harbor.Domain.Diagnostics
{
	/// <summary>
	/// A simmple logger that uses Trace to log.
	/// Works well with Azure.
	/// Only writes in debug mode.
	/// </summary>
	public class Logger : ILogger
	{
		readonly string typeName = "";

		public Logger(Type type)
		{
			typeName = type.FullName;
		}


		public void Debug(string message)
		{
			Debug(message, null);
		}

		public void Debug(string format, params object[] args)
		{
#if !DEBUG
			return;
#endif
			Trace.WriteLine(string.Format(scrub(format), args), "Debug");
			Console.WriteLine(scrub(format), args);
		}


		public void Info(string message)
		{
			Info(message, null);
		}

		public void Info(string format, params object[] args)
		{
#if !DEBUG
			return;
#endif
			Trace.TraceInformation(scrub(format), args);
		}


		public void Warn(string message)
		{
			Warn(message, null);
		}

		public void Warn(string format, params object[] args)
		{
#if !DEBUG
			return;
#endif
			Trace.TraceWarning(scrub(format), args);
		}


		public void Error(Exception exception)
		{
			Error(null, exception, null);
		}

		public void Error(string message)
		{
			Error(message, null, null);
		}

		public void Error(string message, Exception exception)
		{
			Error(message, exception, null);
		}

		public void Error(string format, params object[] args)
		{
			Error(format, null, args);
		}

		public void Error(string format, Exception exception, params object[] args)
		{
#if !DEBUG
			return;
#endif
			if (args == null) args = new object[]{};
			var message = string.IsNullOrEmpty(format) ? "" : string.Format(scrub(format), args);
			if (exception != null)
			{
				message = String.Format("{0}{1}{2}", message, exception.Message, exception.StackTrace);
			}
			Trace.TraceError(message);
		}


		public void Fatal(Exception exception)
		{
			Fatal(null, exception, null);
		}

		public void Fatal(string message)
		{
			Fatal(message, null, null);
		}

		public void Fatal(string message, Exception exception)
		{
			Fatal(message, exception, null);
		}

		public void Fatal(string format, params object[] args)
		{
			Fatal(format, null, args);
		}

		public void Fatal(string format, Exception exception, params object[] args)
		{
#if !DEBUG
			return;
#endif
			format = string.IsNullOrEmpty(format) ? "" : scrub(format);
			var message = args == null ? "" : string.Format(format, args);
			message = exception != null ?
				String.Format("FATAL ERROR - {0} {1} {2}", message, exception.Message, exception.StackTrace) :
				String.Format("FATAL ERROR - {0}", message);
			Trace.TraceError(message);
		}

		private string scrub(string msg)
		{
			if (string.IsNullOrEmpty(typeName))
				return msg;
			return typeName + " - " + msg;
		}
	}
}
