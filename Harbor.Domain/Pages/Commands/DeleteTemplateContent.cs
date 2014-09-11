using System.Linq;

namespace Harbor.Domain.Pages.Commands
{
	public class DeleteTemplateContent : IPageCommand
	{
		public int PageID { get; set; }
		public string UicId { get; set; }
	}

	public class DeleteTemplateContentHandler : IPageCommandHandler<DeleteTemplateContent>
	{
		private readonly IPageRepository _pageRepository;
		private readonly IContentTypeRepository _contentTypeRepository;


		public DeleteTemplateContentHandler(IPageRepository pageRepository, IContentTypeRepository contentTypeRepository)
		{
			_pageRepository = pageRepository;
			_contentTypeRepository = contentTypeRepository;
		}

		public void Execute(DeleteTemplateContent command)
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
