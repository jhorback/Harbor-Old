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
	}


	public class Logger : ILogger
	{
		public void Info(string message)
		{
			Trace.TraceInformation(message);
		}

		public void Info(string format, params object[] args)
		{
			Trace.TraceInformation(format, args);
		}

		public void Warn(string message)
		{
			Trace.TraceWarning(message);
		}

		public void Warn(string format, params object[] args)
		{
			Trace.TraceWarning(format, args);
		}

		public void Error(string message)
		{
			Trace.TraceError(message);
		}

		public void Error(string format, params object[] args)
		{
			Trace.TraceError(format, args);
		}
	}
}
