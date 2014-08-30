using System;

namespace Harbor.UI.Models
{
	/// <summary>
	/// Use with IDtoMapper.
	/// The class that applies this attribute must have a contructor that
	/// takes the FromType as a single parameter.
	/// </summary>
	[AttributeUsage(validOn: AttributeTargets.Class, AllowMultiple = false)]
	public class MapDtoFromAttribute : Attribute
	{
		public MapDtoFromAttribute(Type type)
		{
			FromType = type;
		}

		/// <summary>
		/// The dto must define a constructor with the FromType as a single parameter.
		/// </summary>
		public Type FromType
		{
			get;
			set;
		}
	}
}