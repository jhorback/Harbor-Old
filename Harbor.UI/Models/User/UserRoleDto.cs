using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;

namespace Harbor.UI.Models.User
{
	public class UserRoleDtoMapCreator : IBootstrapperTask
	{
		public void Execute()
		{
			Mapper.CreateMap<Domain.Security.UserFunctionalRole, UserRoleDto>();
			Mapper.CreateMap<UserRoleDto, Domain.Security.UserFunctionalRole>();
		}
	}


	public class UserRoleDto
	{
		public string key { get; set; }
		public string name { get; set; }
		public string description { get; set; }

		public static implicit operator UserRoleDto(Domain.Security.UserFunctionalRole user)
		{
			var dto = Mapper.Map<Domain.Security.UserFunctionalRole, UserRoleDto>(user);
			return dto;
		}

		public static implicit operator Domain.Security.UserFunctionalRole(UserRoleDto user)
		{
			var DO = Mapper.Map<UserRoleDto, Domain.Security.UserFunctionalRole>(user);
			return DO;
		}
	}
}