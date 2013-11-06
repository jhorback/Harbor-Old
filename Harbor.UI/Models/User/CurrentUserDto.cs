using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
using Harbor.Domain.Security;

namespace Harbor.UI.Models.User
{
	public class CurrentUserDtoMapCreator : IBootstrapperTask
	{
		public void Execute()
		{
			Mapper.CreateMap<Domain.Security.User, CurrentUserDto>()
				.ForMember(dest => dest.usersDisplayName, opt => opt.MapFrom(src => src.DisplayName))
				.ForMember(dest => dest.isSysAdmin, opt => opt.MapFrom(src => src.HasPermission(UserFeature.SystemSettings, Permissions.All)))
				.ForMember(dest => dest.hasDocPermissions, opt => opt.MapFrom(src => src.HasPermission(UserFeature.Pages, Permissions.Create)))
				.ForMember(dest => dest.hasFilePermissions, opt => opt.MapFrom(src => src.HasPermission(UserFeature.Files, Permissions.Create)))
				.ForMember(dest => dest.hasSettingsPermissions, opt => opt.MapFrom(src => src.HasPermission(UserFeature.SiteSettings, Permissions.Create) ||
					src.HasPermission(UserFeature.SystemSettings, Permissions.Read)));
		}
	}

	public class CurrentUserDto
	{
		public CurrentUserDto()
		{
			showSignInLink = true;
			isAuthenticated = false;
		}

		public bool showSignInLink { get; set; }
		public bool isAuthenticated { get; set; }
		public string username { get; set; }
		public string usersDisplayName { get; set; }

		public bool hasDocPermissions { get; set; }
		public bool hasFilePermissions { get; set; }
		public bool hasSettingsPermissions { get; set; }
		public bool isSysAdmin { get; set; }
		public string payPalMerchantAccountID { get; set; }

		public static implicit operator CurrentUserDto(Domain.Security.User user)
		{
			var dto = Mapper.Map<Domain.Security.User, CurrentUserDto>(user);
			return dto;
		}
	}
}