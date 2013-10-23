using System;
using System.Diagnostics;


namespace Harbor.Domain
{
	public interface ILogger
	{
		void Debug(string message);
		void Debug(string format, params object[] args);

		void Info(string message);
		void Info(string format, params object[] args);

		void Warn(string message);
		void Warn(string format, params object[] args);

		void Error(Exception exception);
		void Error(string message);
		void Error(string message, Exception exception);
		void Error(string format, params object[] args);
		void Error(string format, Exception exception, params object[] args);

		void Fatal(Exception exception);
		void Fatal(string message);
		void Fatal(string message, Exception exception);
		void Fatal(string format, params object[] args);
		void Fatal(string format, Exception exception, params object[] args);
	}

	// jch! - move class
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
			Trace.WriteLine(string.Format(scrub(format), args), "Debug");
			Console.WriteLine(scrub(format), args);
		}


		public void Info(string message)
		{
			Info(message, null);
		}

		public void Info(string format, params object[] args)
		{
			Trace.WriteLine(string.Format(scrub(format), args), "Info");
			Trace.WriteLine(string.Format(scrub(format), args), "Information");
			Trace.TraceInformation(scrub(format), args);
		}


		public void Warn(string message)
		{
			Warn(message, null);
		}

		public void Warn(string format, params object[] args)
		{
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
			var message = string.IsNullOrEmpty(format) ? "" : string.Format(scrub(format), args);
			if (exception != null)
			{
				message = String.Format("FATAL ERROR - {0} {1} {2}", message, exception.Message, exception.StackTrace);
			}
			else
			{
				message = String.Format("FATAL ERROR - {0}", message);
			}
			Trace.TraceError(message);
		}
		
		

		private string scrub(string msg)
		{
			if (string.IsNullOrEmpty(typeName))
				return msg;
			return typeName + " - " + msg;
		}
	}





	public class HarborTextWriterTraceListener : TextWriterTraceListener
	{
		public HarborTextWriterTraceListener(string fileName)
			: base(fileName) { }

		public override void Write(string message)
		{
			base.Write(String.Format("[{0}]:{1}", DateTime.Now, message));
		}

		public override void WriteLine(string message)
		{
			base.WriteLine(String.Format("[{0}]:{1}", DateTime.Now, message));
		}
	}
}
