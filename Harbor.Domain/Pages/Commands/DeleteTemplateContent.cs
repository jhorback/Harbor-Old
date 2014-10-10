using System.Linq;
using Harbor.Domain.Command;

namespace Harbor.Domain.Pages.Commands
{
	public class DeleteTemplateContent : PageCommand
	{
		public string UicId { get; set; }
	}

	public class DeleteTemplateContentHandler : ICommandHandler<DeleteTemplateContent>
	{
		private readonly IPageRepository _pageRepository;
		private readonly IContentTypeRepository _contentTypeRepository;


		public DeleteTemplateContentHandler(IPageRepository pageRepository, IContentTypeRepository contentTypeRepository)
		{
			_pageRepository = pageRepository;
			_contentTypeRepository = contentTypeRepository;
		}

		public void Handle(DeleteTemplateContent command)
		{
			var page = _pageRepository.FindById(command.PageID, readOnly: false);

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
