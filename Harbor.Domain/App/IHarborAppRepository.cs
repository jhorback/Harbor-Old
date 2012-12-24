using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Harbor.Domain.App
{
	public interface IHarborAppRepository
	{
		HarborApp GetApp();

		void SetApp(HarborApp app);
	}
}
