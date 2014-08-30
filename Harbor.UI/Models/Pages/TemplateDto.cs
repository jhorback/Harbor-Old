using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Harbor.Domain.Pages;
using Harbor.UI.Models.Content;

namespace Harbor.UI.Models
{
	public class TemplateDto
	{
		public int pageID { get; set; }
		public List<TemplateUicDto> content { get; set; }
		public IDictionary<string, Object> contentData { get; set; }
		public string defaultContentClassName { get; set; }
		public int componentCounter { get; set; }


		public static TemplateDto FromTemplate(Template template, IDtoMapper dtoMapper)
		{
			return new TemplateDto
			{
				pageID = template.PageID,
				content = template.Content.Select(TemplateUicDto.FromTemplateUic).ToList(),
				contentData = convertContentToDtos(template.contentData, dtoMapper),
				defaultContentClassName = template.DefaultContentClassName,
				componentCounter = template.ComponentCounter
			};
		}

		private static IDictionary<string, object> convertContentToDtos(IDictionary<string, object> contentData, IDtoMapper dtoMapper)
		{
			var dtos = new Dictionary<string, object>();
			foreach (var item in contentData)
			{
				dtos.Add(item.Key, dtoMapper.MapFrom(item.Value));
			}
			return dtos;
		}

		public static Template ToTemplate(TemplateDto templateDto, Template template)
		{
			template.PageID = templateDto.pageID;
			template.Content = templateDto.content.Select(TemplateUicDto.ToTemplateUic).ToList();
			template.DefaultContentClassName = templateDto.defaultContentClassName;
			template.ComponentCounter = templateDto.componentCounter;
			return template;
		}
	}



	public class UicDto
	{
		public string key { get; set; }
		public string id { get; set; }

		public UicDto() { }

		public UicDto(Uic uic)
		{
			key = uic.Key;
			id = uic.Id;
		}

		public static UicDto FromUic(Uic uic)
		{
			if (uic == null)
			{
				return null;
			}

			return new UicDto(uic);
		}

		public static Uic ToUic(UicDto uic)
		{
			return new Uic
			{
				Key = uic.key,
				Id = uic.id
			};
		}
	}

	public class TemplateUicDto
	{
		public string key { get; set; }
		public string id { get; set; }
		public string[] classNames { get; set; }

		public TemplateUicDto() { }

		public TemplateUicDto(TemplateUic uic)
		{
			key = uic.Key;
			id = uic.Id;
			classNames = uic.ClassNames;
		}

		public static TemplateUicDto FromTemplateUic(TemplateUic uic)
		{
			return new TemplateUicDto(uic);
		}

		public static TemplateUic ToTemplateUic(TemplateUicDto uic)
		{
			return new TemplateUic
			{
				Key = uic.key,
				Id = uic.id,
				ClassNames = uic.classNames
			};
		}
	}
}