using System;
using System.Diagnostics;


namespace Harbor.Domain
{
	public interface ILogger
	{
		void Info(string message);
		void Info(string format, params object[] args);

		void Warn(string message);
		void Warn(string format, params object[] args);

		void Error(string message);
		void Error(string format, params object[] args);

		void Debug(string message);
		void Debug(string format, params object[] args);
	}

	// jch! - move class
	public class Logger : ILogger
	{
		readonly string typeName = "";

		public Logger() { }

		public Logger(Type type)
		{
			typeName = type.FullName;
		}

		public void Info(string message)
		{
			Trace.TraceInformation(scrub(message));
		}

		public void Info(string format, params object[] args)
		{
			Trace.TraceInformation(scrub(format), args);
		}

		public void Warn(string message)
		{
			Trace.TraceWarning(scrub(message));
		}

		public void Warn(string format, params object[] args)
		{
			Trace.TraceWarning(scrub(format), args);
		}

		public void Error(string message)
		{
			Trace.TraceError(scrub(message));
		}

		public void Error(string format, params object[] args)
		{
			Trace.TraceError(scrub(format), args);
		}
		
		public void Debug(string message)
		{
			Trace.WriteLine(scrub(message));
			Console.WriteLine(scrub(message));
		}

		public void Debug(string format, params object[] args)
		{
			Trace.WriteLine(format); // jch! just testing - there is a category here too
			Console.WriteLine(scrub(format), args);
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
			Flush();
		}

		public override void WriteLine(string message)
		{
			base.WriteLine(String.Format("[{0}]:{1}", DateTime.Now, message));
			Flush();
		}
	}
}
