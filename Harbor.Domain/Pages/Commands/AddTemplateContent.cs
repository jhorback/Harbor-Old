﻿
using System;

namespace Harbor.Domain.Pages.Commands
{
	public class AddTemplateContent : IPageCommand
	{
		public AddTemplateContent() 
		{
			Prepend = false;
		}

		public int PageID { get; set; }
		public string Key { get; set; }
		public bool Prepend { get; set; }
	}

	public class AddTemplateContentHandler : IPageCommandHandler<AddTemplateContent>
	{
		private readonly IPageRepository _pageRepository;
		

		public AddTemplateContentHandler(IPageRepository pageRepository)
		{
			_pageRepository = pageRepository;
		}

		public void Execute(AddTemplateContent command)
		{
			if (string.IsNullOrEmpty(command.Key))
			{
				throw new DomainValidationException("Key cannot be null.");
			}

			var page = _pageRepository.FindById(command.PageID, readOnly: false);
			if (command.Prepend)
			{
				page.Template.PrependContent(command.Key);
			}
			else
			{
				page.Template.AppendContent(command.Key);				
			}
			_pageRepository.Update(page);
			_pageRepository.Save();
		}
	}
}
