using System;


namespace Harbor.Domain
{
	public interface ILogger
	{
		/// <summary>
		/// Use for debugging and tracing.
		/// </summary>
		/// <param name="message"></param>
		void Debug(string message);
		/// <summary>
		/// Use for debugging and tracing.
		/// </summary>
		/// <param name="format"></param>
		/// <param name="args"></param>
		void Debug(string format, params object[] args);


		/// <summary>
		/// Use for positive events (data changed, redirection, etc).
		/// </summary>
		/// <param name="message"></param>
		void Info(string message);
		/// <summary>
		/// Use for positive events (data changed, redirection, etc).
		/// </summary>
		/// <param name="format"></param>
		/// <param name="args"></param>
		void Info(string format, params object[] args);

		/// <summary>
		/// Use for non errors but as a heads up.
		/// </summary>
		/// <param name="message"></param>
		void Warn(string message);
		/// <summary>
		/// Use for non errors but as a heads up.
		/// </summary>
		/// <param name="format"></param>
		/// <param name="args"></param>
		void Warn(string format, params object[] args);


		/// <summary>
		/// Use for recoverable errors.
		/// </summary>
		/// <param name="exception"></param>
		void Error(Exception exception);
		/// <summary>
		/// Use for recoverable errors.
		/// </summary>
		/// <param name="message"></param>
		void Error(string message);
		/// <summary>
		/// Use for recoverable errors.
		/// </summary>
		/// <param name="message"></param>
		/// <param name="exception"></param>
		void Error(string message, Exception exception);
		/// <summary>
		/// Use for recoverable errors.
		/// </summary>
		/// <param name="format"></param>
		/// <param name="args"></param>
		void Error(string format, params object[] args);
		/// <summary>
		/// Use for recoverable errors.
		/// </summary>
		/// <param name="format"></param>
		/// <param name="exception"></param>
		/// <param name="args"></param>
		void Error(string format, Exception exception, params object[] args);


		/// <summary>
		/// Use for un-recoverable errors.
		/// </summary>
		/// <param name="exception"></param>
		void Fatal(Exception exception);
		/// <summary>
		/// Use for un-recoverable errors.
		/// </summary>
		/// <param name="message"></param>
		void Fatal(string message);
		/// <summary>
		/// Use for un-recoverable errors.
		/// </summary>
		/// <param name="message"></param>
		/// <param name="exception"></param>
		void Fatal(string message, Exception exception);
		/// <summary>
		/// Use for un-recoverable errors.
		/// </summary>
		/// <param name="format"></param>
		/// <param name="args"></param>
		void Fatal(string format, params object[] args);
		/// <summary>
		/// Use for un-recoverable errors.
		/// </summary>
		/// <param name="format"></param>
		/// <param name="exception"></param>
		/// <param name="args"></param>
		void Fatal(string format, Exception exception, params object[] args);
	}
}
