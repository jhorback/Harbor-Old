using System.Linq;
using Harbor.Domain.Command;

namespace Harbor.Domain.Pages.Commands
{
	public class MoveContent : PageCommand
	{
		public string UicId { get; set; }
	}

	public class MoveContentHandler : ICommandHandler<MoveContent>
	{
		private readonly IPageRepository _pageRepository;
		private readonly IContentTypeRepository _contentTypeRepository;


		public MoveContentHandler(IPageRepository pageRepository, IContentTypeRepository contentTypeRepository)
		{
			_pageRepository = pageRepository;
			_contentTypeRepository = contentTypeRepository;
		}

		public void Handle(MoveContent command)
		{
			var page = _pageRepository.FindById(command.PageID);

			var uic = page.Template.Content.FirstOrDefault(c => c.Id == command.UicId);
			if (uic == null)
			{
				return;
			}

			var handler = _contentTypeRepository.GetTemplateContentHandler(uic, page);
			if (handler != null)
			{
				handler.OnDelete();
			}

			page.Template.Content.Remove(uic);

			_pageRepository.Update(page);
			_pageRepository.Save();
		}
	}
}
