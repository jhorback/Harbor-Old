using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AutoMapper;
using Harbor.Domain.App;
using Harbor.UI.Extensions;
using Harbor.UI.Models.Setting;

namespace Harbor.UI.Controllers.Api
{
	// jch* unsecure settings api exposure - not sure if using this anyway - using AppSettingsController
	//public class SettingsController : ApiController
	//{
	//    IAppSettingRepository appSettings;

	//    public SettingsController(IAppSettingRepository appSettings)
	//    {
	//        this.appSettings = appSettings;
	//    }

	//    // GET api/settings
	//    public IEnumerable<AppSettingDto> Get()
	//    {
	//        return appSettings.FindAll().Select(s => (AppSettingDto)s);
	//    }

	//    // GET api/settings/5
	//    public HttpResponseMessage Get(string name)
	//    {
	//        var setting = appSettings.FindByName(name);
	//        if (setting == null)
	//            return Request.CreateNotFoundResponse();
	//        return Request.CreateOKResponse(setting);
	//    }

	//    // POST api/settings
	//    public HttpResponseMessage Post(AppSettingDto setting)
	//    {
	//        try
	//        {
	//            return Request.CreateOKResponse(appSettings.Create(setting));
	//        }
	//        catch (InvalidOperationException exception)
	//        {
	//            return Request.CreateBadRequestResponse(exception.Message);
	//        }
	//    }

	//    // PUT api/settings/5
	//    public HttpResponseMessage Put(string name, AppSettingDto setting)
	//    {
	//        setting.name = name;
	//        var settingDO = appSettings.FindByName(setting.name);
	//        if (settingDO == null)
	//        {
	//            settingDO = appSettings.Create(setting);
	//        }
	//        else
	//        {
	//            settingDO = Mapper.Map<AppSettingDto, Domain.App.AppSetting>(setting, settingDO);
	//            settingDO = appSettings.Update(settingDO);
	//        }
	//        return Request.CreateOKResponse(settingDO);
	//    }

	//    // DELETE api/settings/5
	//    public HttpResponseMessage Delete(string name)
	//    {
	//        var settingDO = appSettings.FindByName(name);
	//        if (settingDO != null)
	//        {
	//            appSettings.Delete(settingDO);
	//        }
	//        return Request.CreateNoContentResponse();

	//    }
	//}
}
