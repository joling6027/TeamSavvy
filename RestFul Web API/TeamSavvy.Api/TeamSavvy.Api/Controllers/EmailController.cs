using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MimeKit;
using System.Net;
using TeamSavvy.Api.BusinessModel.Helper;
using TeamSavvy.Api.Services.IServices;
using TeamSavvy.Api.Services.Services;

namespace TeamSavvy.Api.Entities.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        #region Private Member Variables

        /// <summary>
        /// Mail service interface variable.
        /// </summary>
        private readonly IMailService _mailService;

        #endregion

        #region Constructor
        public EmailController(IMailService mailService)
        {
            _mailService = mailService;
        }
        #endregion
        [HttpPost]
        public IActionResult SendEmail(string body)
        {

            ActionResult response;

            if(string.IsNullOrWhiteSpace(body))
            {
                response = BadRequest(new ResponseMessage(false, null, new Message(HttpStatusCode.BadRequest, "Email body is incorrect.")));
            }
            else
            {
                var authUser = _mailService.SendEmilAsync(body);
                if (authUser == null)
                {
                    response = NotFound(new ResponseMessage(false, null, new Message(HttpStatusCode.NotFound, "Email body is incorrect.")));
                }
                else
                {
                    response = Ok(new ResponseMessage(true, authUser, new Message(HttpStatusCode.OK)));
                }

            }
            return response;

           
        }
    }
}
