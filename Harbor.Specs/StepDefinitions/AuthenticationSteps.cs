using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Harbor.Domain.Files;
using Harbor.Domain.Pages;
using Harbor.Domain.Security;
using Harbor.UI.Controllers;
using Harbor.UI.Models.Setting;
using Harbor.UI.Models.User;
using Moq;
using NUnit.Framework;
using TechTalk.SpecFlow;

namespace Harbor.Specs.StepDefinitions
{
    [Binding]
    public class AuthenticationSteps
    {
    	UserController userController;
		Mock<IUserRepository> userRepository;
		Mock<CurrentUserRepository> currentUserRepository;
		Mock<IPageRepository> pageRep;
		Mock<IFileRepository> fileRep;
		Mock<SettingsViewModelRepository> settingsViewModelRep;

		HttpStatusCodeResult currentResult;
		string enteredUsername;
		string enteredPassword;
		string validPassword = "validPassword";
		string invalidPassword = "invalidPassword";

	    public AuthenticationSteps()
		{
			userRepository = new Mock<IUserRepository>();
			currentUserRepository = new Mock<CurrentUserRepository>();
			pageRep = new Mock<IPageRepository>();
			fileRep = new Mock<IFileRepository>();
			settingsViewModelRep = new Mock<SettingsViewModelRepository>();
			userController = new UserController(userRepository.Object, currentUserRepository.Object,
				pageRep.Object, fileRep.Object, settingsViewModelRep.Object);
		}

        [Given(@"I have entered a valid username and password")]
        public void GivenIHaveEnteredAValidUsernameAndPassword()
        {
			enteredUsername = "jhorback";
			enteredPassword = validPassword;
        }
        
        [Given(@"I have entered an invalid username or password")]
        public void GivenIHaveEnteredAnInvalidUsernameOrPassword()
        {
			enteredUsername = "jhorback";
        	enteredPassword = invalidPassword;
        }
        
        [Given(@"I am not enabled")]
        public void GivenIAmNotEnabled()
        {
        }
        
        [When(@"I sign in")]
        public void WhenISignIn()
        {
        	var user = new User { UserName = enteredUsername };
        	user.SetPassword(validPassword);
			userRepository.Setup(r => r.FindUserByName(It.IsAny<string>())).Returns(user);
			currentResult = userController.SignIn(enteredUsername, enteredPassword, null);
        }
        
        [Then(@"the result is successful")]
        public void ThenTheResultIsSuccessful()
        {
			Assert.Equals(currentResult.StatusCode, 200);
        }
        
        [Then(@"the result is unsuccessful")]
        public void ThenTheResultIsUnsuccessful()
        {
			Assert.Equals(currentResult.StatusCode, 400);
        }
        
        [Then(@"the message is ""(.*)""")]
        public void ThenTheMessageIs(string p0)
        {
			//jch* testing
           Assert.True(true);
        }
        
        [Then(@"the message contains ""(.*)""")]
        public void ThenTheMessageContains(string p0)
        {
			// jch* testing
			Assert.True(true);
        }
    }
}
