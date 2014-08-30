using System;
using System.Collections.Generic;
using Harbor.Domain;

namespace Harbor.UI.Models
{
	public class DtoMapper : IDtoMapper
	{
		private readonly ReflectionUtils _reflectionUtils;
		private readonly IMemCache _memCache;
		Dictionary<Type, Type> fromTypeToType;

		public DtoMapper(ReflectionUtils reflectionUtils, IMemCache memCache)
		{
			_reflectionUtils = reflectionUtils;
			_memCache = memCache;

			initTypes();
		}

		private void initTypes()
		{
			fromTypeToType = _memCache.GetGlobal<Dictionary<Type, Type>>("dtoMapperTypes");
			if (fromTypeToType == null)
			{
				fromTypeToType = new Dictionary<Type, Type>();
				var types = _reflectionUtils.FindTypesWithAttribute<MapDtoFromAttribute>();
				foreach (var toType in types)
				{
					var attribute = _reflectionUtils.GetAttribute<MapDtoFromAttribute>(toType);
					var fromType = attribute.FromType;
					fromTypeToType.Add(fromType, toType);
				}
				_memCache.SetGlobal("dtoMapperTypes", fromTypeToType, DateTime.Now.AddYears(1));
			}
		}

		public object MapFrom(object source)
		{
			var toType = fromTypeToType[source.GetType()];
			object dto;

			if (toType == null)
			{
				throw new Exception("Type not mapped.");
			}

			try
			{
				dto = _reflectionUtils.CreateInstance(toType, new[] { source });
			}
			catch (Exception e)
			{
				throw new Exception("Failed to map dto.", e);
			}
			return dto;
		}
	}
}