using System.Collections.Generic;
using Harbor.Domain.Pages.Content;
using Harbor.Domain.Pages.PipelineHandlers;
using Harbor.Domain.Pipeline;

namespace Harbor.Domain.Pages
{
	public class PageUpdatePipeline : BasePipeline<Page>
	{
		public PageUpdatePipeline(IObjectFactory objectFactory)
			: base(objectFactory)
		{
			AddHandler<PageTypeUpdateHandler>();
			AddHandler<ContentLoadHandler>(); // run this before the resource updater
			AddHandler<ContentResourceUpdateHandler>();
		}
	}






	public interface IPageCommandService
	{
		void Execute(IPageCommand command);
	}

	public class PageCommandService : IPageCommandService
	{
		private readonly Dictionary<string, object> handlers = new Dictionary<string, object>();
		// handlers may be handlerTypes
		// then have a handlers cache
		// look in cache first if not found create from handlerTypes.


		public PageCommandService()
		{
			
		}

		public void Execute(IPageCommand command)
		{
			var commandName = command.GetType().Name.ToLower();
			var handler = handlers.ContainsKey(commandName) ? handlers[commandName] : null;
			if (handler != null)
			{
				// handler.Execute(command);
			}
		}
	}



	




	public class AddNewPageToLinksHandler : IPageCommandHandler<AddNewPageToLinks>
	{
		private readonly IPageRepository _pageRepository;
		private readonly IPageFactory _pageFactory;

		public AddNewPageToLinksHandler(IPageRepository pageRepository, IPageFactory pageFactory)
		{
			_pageRepository = pageRepository;
			_pageFactory = pageFactory;
		}

		public void Execute(AddNewPageToLinks command)
		{
			var page = _pageRepository.FindById(command.PageID, readOnly: false);
			var links = page.Layout.GetAsideAdata<Links>();


			var layoutId = page.Layout.PageLayoutID;
			var publish = page.Public;

			var newPage = _pageFactory.Create(command.User, command.PageType, command.Title, publish, layoutId);
			_pageRepository.Create(newPage);
			_pageRepository.Save();

			var section = links.sections[command.SectionIndex];
			if (section != null) // need more checking here for index
			{
				section.links.Add(new Links.LinksSectionLink
				{
					pageID = newPage.PageID,
					text =  command.Title
				});
			}

			_pageRepository.Update(page);
			_pageRepository.Save();
		}
	}


	public interface IPageCommandHandler<T> where T : IPageCommand
	{
		void Execute(T command);
	}

	public class AddNewPageToLinks : IPageCommand
	{
		public string User { get; set; }
		public int PageID { get; set; }
		public string Title { get; set; }
		public string PageType { get; set; }
		public int SectionIndex { get; set; }
	}

	public interface IPageCommand
	{

	}
}
