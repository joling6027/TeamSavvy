using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Net;
using TeamSavvy.Api.BusinessModel.DataTransferModel;
using TeamSavvy.Api.BusinessModel.Helper;
using TeamSavvy.Api.Services.IServices;

namespace TeamSavvy.Api.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class AuthController : ControllerBase
    {
        #region Private Member Variables

        /// <summary>
        /// Authenticate service interface variable.
        /// </summary>
        private readonly IAuthService _authService;

        #endregion

        #region Constructor
        public AuthController(IAuthService authenticateService)
        {
            _authService = authenticateService;
        }
        #endregion

        #region endpoints
        // GET api/values  
        [HttpPost, Route("login")]
        [EnableCors("AllowOrigin")]
        public IActionResult Login([FromBody] LoginDto user)
        {
            ActionResult response;
            ResponseMessage responseMessage;
            if (user == null)
            {
                response = BadRequest(new ResponseMessage(false, null, new Message(HttpStatusCode.BadRequest, "User name or password is incorrect.")));
            }

            var authUser = _authService.Authenticate(user.EmployeeId, user.Password);
            if (authUser == null)
            {
                response = NotFound(new ResponseMessage(false, null, new Message(HttpStatusCode.NotFound, "User name or password is incorrect.")));
            }
            else
            {
                response = Ok(new ResponseMessage(true, authUser, new Message(HttpStatusCode.OK)));
            }
            return response;
        }
        #endregion
    }
}
