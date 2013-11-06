using AutoMapper;
using PageComponents = Harbor.Domain.Pages.PageComponents;
using Products = Harbor.Domain.Products;


namespace Harbor.UI.Models.Components
{
	public class PayPalButtonDtoMapper : IBootstrapperTask
	{
		public void Execute()
		{
			Mapper.CreateMap<PageComponents.PayPalButton, PayPalButtonDto>()
				.ForMember(dest => dest.id, opt => opt.MapFrom(src => src.PayPalButtonID));
			Mapper.CreateMap<Products.PayPalButton, PayPalButtonDto>()
				.ForMember(dest => dest.id, opt => opt.MapFrom(src => src.PayPalButtonID));
			Mapper.CreateMap<PayPalButtonDto, Products.PayPalButton>()
				.ForMember(dest => dest.PayPalButtonID, opt => opt.MapFrom(src => src.id));
		}
	}


	public class PayPalButtonDto
	{
		public int id { get; set; }
		public string userName { get; set; }
		public string name { get; set; }
		public string description { get; set; }
		public bool hosted { get; set; }
		public string buttonCode { get; set; }
		public string buttonType { get; set; }
		public string itemNumber { get; set; }
		public decimal price { get; set; }
		public decimal? shippingOverride { get; set; }
		public decimal? taxOverride { get; set; }
		

		public static implicit operator PayPalButtonDto(PageComponents.PayPalButton button)
		{
			var dto = Mapper.Map<PageComponents.PayPalButton, PayPalButtonDto>(button);
			return dto;
		}

		public static implicit operator PayPalButtonDto(Products.PayPalButton button)
		{
			var dto = Mapper.Map<Products.PayPalButton, PayPalButtonDto>(button);
			return dto;
		}

		public static implicit operator Products.PayPalButton(PayPalButtonDto button)
		{
			var dto = Mapper.Map<PayPalButtonDto, Products.PayPalButton>(button);
			return dto;
		}
	}
}