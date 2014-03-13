using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Harbor.Domain.Pages;
using Harbor.Domain.Pages.PageComponents;

namespace Harbor.Domain.Pipeline
{
	public interface IPipeline<T>
	{
		void AddHandler<TH>() where TH : IPipelineHanlder<T>;
		void Execute(IPipelineContext<T> context);
	}
	
	public interface IPipelineContext<out T>
	{
		T Target { get; }
	}

	public class PipelineContext<T> : IPipelineContext<T>
	{
		public PipelineContext(T target)
		{
			Target = target;
		}

		public T Target { get; private set; }
	}

	public interface IPipelineHanlder<T>
	{
		void Execute(IPipelineContext<T> context);
	}


	public abstract class BasePipeline<T> : IPipeline<T>
	{
		protected BasePipeline(IObjectFactory objectFactory)
		{
			handlers = new List<IPipelineHanlder<T>>();
			this.objectFactory = objectFactory;
		}

		private readonly IObjectFactory objectFactory;
		private List<IPipelineHanlder<T>> handlers { get; set; }

		public void AddHandler<TH>() where TH : IPipelineHanlder<T>
		{
			handlers.Add(this.objectFactory.GetInstance<TH>());
		}

		public void Execute(IPipelineContext<T> context)
		{
			handlers.ForEach(h => h.Execute(context));
		}

		public void Execute(T target)
		{
			var context = new PipelineContext<T>(target);
			Execute(context);
		}
	}





	public interface IObjectFactory
	{
		T GetInstance<T>();
	}







	public class PageUpdatePipeline : BasePipeline<Page>
	{
		public PageUpdatePipeline(IObjectFactory objectFactory) : base(objectFactory)
		{
			AddHandler<AlternateTitleHandler>();
		}
	}


	/// <summary>
	/// Update the pages AlternateTitle if the first aside component is a Links component.
	/// Sets it to the links name.
	/// </summary>
	public class AlternateTitleHandler : IPipelineHanlder<Page>
	{
		private readonly IPageComponentRepository _pageComponentRepository;

		public AlternateTitleHandler(IPageComponentRepository pageComponentRepository)
		{
			_pageComponentRepository = pageComponentRepository;
		}

		public void Execute(IPipelineContext<Page> context)
		{
			var page = context.Target;
			if (!page.Template.Aside.Any())
			{
				return;
			}

			var firstAside = page.Template.Aside.First();
			if (firstAside.key == Harbor.Domain.Pages.Components.Links.KEY)
			{
				// maybe add a method to comprepository: GetCoimponent(page, firstAside); instead of above if block
				var links = _pageComponentRepository.GetComponent<Links>(page, firstAside.uicid);
				if (links != null)
				{
					// page.Title = links.Name;
					// page.AlternateTitle = links.Name;
				}
			}
		}
	}



	public class Test
	{
		private readonly IObjectFactory _objectFactory;

		public Test(IObjectFactory objectFactory)
		{
			_objectFactory = objectFactory;
		}

		public Test()
		{
			var pup = new PageUpdatePipeline(_objectFactory);
			pup.Execute(new Page());
		}
	}


}
