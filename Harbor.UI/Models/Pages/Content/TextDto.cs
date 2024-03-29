﻿using Harbor.Domain.Pages.Content;

namespace Harbor.UI.Models.Content
{
	[MapDtoFrom(typeof(Text))]
	public class TextDto
	{
		private string _text;

		public bool hasText
		{
			get
			{
				return !string.IsNullOrEmpty(_text);
			}
		}

		public string text
		{
			get
			{
				return _text;
			}
			set
			{
				_text = value;
			}
		}

		public TextDto()
		{
		}

		public TextDto(Text text)
		{
			_text = text.Html;
		}

		public static TextDto FromText(Text text)
		{
			return new TextDto(text);
		}
	}
}