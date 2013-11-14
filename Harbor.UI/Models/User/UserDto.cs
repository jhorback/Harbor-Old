using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
using Harbor.Domain.Security;

namespace Harbor.UI.Models.User
{
	public class UserDtoMapCreator : IBootstrapperTask
	{
		public void Execute()
		{
			Mapper.CreateMap<Domain.Security.User, UserDto>()
				.ForMember(dest => dest.password, opt => opt.Ignore())
				.ForMember(dest => dest.created, opt => opt.MapFrom(src => src.Created.ToShortDateString()))
				.ForMember(dest => dest.lastLogin, opt => opt.MapFrom(src => getDateOrEmptyString(src.LastLogin)))
				.ForMember(dest => dest.lastActivity, opt => opt.MapFrom(src => getDateOrEmptyString(src.LastActivity)))
				.ForMember(dest => dest.roles, opt => opt.MapFrom(src => src.GetRoles()));

			Mapper.CreateMap<UserDto, Domain.Security.User>()
				//.ForMember(dest => dest.UserName, opt => opt.Ignore())
				.ForMember(dest => dest.Password, opt => opt.Ignore())
				.ForMember(dest => dest.Created, opt => opt.Ignore())
				.ForMember(dest => dest.LastLogin, opt => opt.Ignore())
				.ForMember(dest => dest.LastActivity, opt => opt.Ignore())
				.AfterMap((dto, DO) => DO.SetRoles(dto.roles))
				.AfterMap((dto, DO) =>
				{
					if (string.IsNullOrEmpty(dto.password) == false)
						DO.SetPassword(dto.password);
				});
		}

		private string getDateOrEmptyString(DateTime? date)
		{
			if (date == null)
				return "";
			else return (date ?? DateTime.Now).ToShortDateString();
		}
	}


	public class UserDto
	{
		public string userName { get; set; }
		public string password { get; set; }
		public string currentPassword { get; set; }
		public string newPassword { get; set; }
		public string firstName { get; set; }
		public string middleName { get; set; }
		public string lastName { get; set; }
		public string displayName { get; set; }
		public string email { get; set; }
		public string created { get; set; }
		public string lastLogin { get; set; }
		public string lastActivity { get; set; }
		public bool enabled { get; set; }
		public string payPalMerchantAccountID { get; set; }
		public string[] roles { get; set; }

		public static implicit operator UserDto(Domain.Security.User user)
		{
			var dto = Mapper.Map<Domain.Security.User, UserDto>(user);
			return dto;
		}

		public static implicit operator Domain.Security.User(UserDto user)
		{
			var DO = Mapper.Map<UserDto, Domain.Security.User>(user, UserFactory.CreateUser());
			return DO;
		}
	}
}