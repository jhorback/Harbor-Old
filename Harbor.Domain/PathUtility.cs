﻿using System;
using System.Web;

namespace Harbor.Domain
{
	public class PathUtility : IPathUtility
	{
		private readonly HttpServerUtilityBase _server;

		public PathUtility(HttpServerUtilityBase server)
		{
			_server = server;
		}

		public string ToAbsolute(string virtualPath)
		{
			return virtualPath != null && virtualPath.IndexOf("~", StringComparison.Ordinal) == 0
				? VirtualPathUtility.ToAbsolute(virtualPath)
				: virtualPath;
		}


		public string MapVirtualPath(string virtualPath)
		{
			return _server.MapPath(ToAbsolute(virtualPath));
		}
	}
}
