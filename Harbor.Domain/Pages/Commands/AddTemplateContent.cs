using Harbor.Domain.Command;

namespace Harbor.Domain.Pages.Commands
{
	public class AddTemplateContent : PageCommand
	{
		public string Key { get; set; }
	}

	public class AddTemplateContentHandler : ICommandHandler<AddTemplateContent>
	{
		private readonly IPageRepository _pageRepository;
		private readonly IContentTypeRepository _contentTypeRepository;


		public AddTemplateContentHandler(IPageRepository pageRepository, IContentTypeRepository contentTypeRepository)
		{
			_pageRepository = pageRepository;
			_contentTypeRepository = contentTypeRepository;
		}

		public void Handle(AddTemplateContent command)
		{
			if (string.IsNullOrEmpty(command.Key))
			{
				throw new DomainValidationException("Key cannot be null.");
			}

			if (_contentTypeRepository.TemplateContentTypeExists(command.Key) == false)
			{
				throw new DomainValidationException("The template content type does not exist.");
			}

			var page = _pageRepository.FindById(command.PageID);
			page.Template.AddContent(command.Key);
			_pageRepository.Update(page);
			_pageRepository.Save();
		}
	}
}
