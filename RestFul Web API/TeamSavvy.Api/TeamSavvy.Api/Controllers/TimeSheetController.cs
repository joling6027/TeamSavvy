using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net;
using TeamSavvy.Api.BusinessModel.Helper;
using TeamSavvy.Api.Services.IServices;
using TeamSavvy.Api.BusinessModel.DataTransferModel;
using System.Linq;
using Microsoft.Extensions.Logging;
using TeamSavvy.Api.Services.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TeamSavvy.Api.Entities.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TimeSheetController : ControllerBase
    {

        #region Private Member Variables

        /// <summary>
        /// Employee records service interface variable.
        /// </summary>
        private readonly ITimeSheetService _timeSheetService;
        private readonly ILogger<TimeSheetController> _logger;
        #endregion

        #region Constructors

        #region Constructors
        public TimeSheetController(ITimeSheetService timeSheetService, ILogger<TimeSheetController> logger)
        {
            _timeSheetService = timeSheetService;
            _logger = logger;
        }
        #endregion

        #endregion

        [Route("{employeeId:int}")]
        [HttpGet/*, Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = Access.Employee)*/]
        [Produces("application/json")]
        [ProducesResponseType(typeof(ResponseMessage), 200)]
        [ProducesResponseType(typeof(ResponseMessage), 400)]
        [ProducesResponseType(typeof(ResponseMessage), 401)]
        [ProducesResponseType(typeof(ResponseMessage), 404)]
        public ActionResult<EmployeeDto> GetEmployeeTimeSheet([FromRoute] int employeeId)
        {
            ActionResult response;
            ResponseMessage responseMessage;
            if (employeeId <= 0)
            {
                responseMessage = new ResponseMessage(false, null, new Message(HttpStatusCode.BadRequest, "Please enter valid employee id."));
                response = BadRequest(responseMessage);
            }
            else
            {
                List<TimeSheetDto> timeSheets = _timeSheetService.GetTimeSheet(employeeId);
                if (timeSheets == null || !timeSheets.Any())
                {
                    response = NotFound(new ResponseMessage(false, null, new Message(HttpStatusCode.NotFound, $"There is no record in database.")));
                }
                else
                {
                    response = Ok(new ResponseMessage(true, timeSheets, new Message(HttpStatusCode.OK)));
                }
            }

            return response;
        }

        [Route("mobile/{employeeId:int}")]
        [HttpGet/*, Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = Access.Employee)*/]
        [Produces("application/json")]
        [ProducesResponseType(typeof(ResponseMessage), 200)]
        [ProducesResponseType(typeof(ResponseMessage), 400)]
        [ProducesResponseType(typeof(ResponseMessage), 401)]
        [ProducesResponseType(typeof(ResponseMessage), 404)]
        public ActionResult<EmployeeDto> GetEmployeeTimeSheetMobile([FromRoute] int employeeId)
        {
            ActionResult response;
            ResponseMessage responseMessage;
            if (employeeId <= 0)
            {
                responseMessage = new ResponseMessage(false, null, new Message(HttpStatusCode.BadRequest, "Please enter valid employee id."));
                response = BadRequest(responseMessage);
            }
            else
            {
                var timeSheets = _timeSheetService.GetTimeSheetMobile(employeeId);
                if (string.IsNullOrWhiteSpace(timeSheets))
                {
                    response = NotFound(new ResponseMessage(false, null, new Message(HttpStatusCode.NotFound, $"There is no record in database.")));
                }
                else
                {
                    response = Ok(new ResponseMessage(true, timeSheets, new Message(HttpStatusCode.OK)));
                }
            }
            

            return response;
        }


        [Route("addTimesheet")]
        [HttpPost]
        [Produces("application/json")]
        [ProducesResponseType(typeof(ResponseMessage), 200)]
        [ProducesResponseType(typeof(ResponseMessage), 400)]
        [ProducesResponseType(typeof(ResponseMessage), 401)]
        [ProducesResponseType(typeof(ResponseMessage), 404)]
        public ActionResult<EmployeeDto> AddEmployeeDetails([FromBody] TimeSheetDto timeSheet)
        {
            ActionResult response;
            ResponseMessage responseMessage;
            if (!ModelState.IsValid)
            {
                responseMessage = new ResponseMessage(false, null, new Message(HttpStatusCode.BadRequest, "There is invalid entry."));
                response = BadRequest(responseMessage);
            }
            else
            {
                bool isSuccess = _timeSheetService.AddAttendence(timeSheet);
                if (!isSuccess)
                {
                    response = NotFound(new ResponseMessage(false, null, new Message(HttpStatusCode.NotFound, "No record is add in database.")));
                }
                else
                {
                    response = Ok(new ResponseMessage(true, isSuccess, new Message(HttpStatusCode.OK)));
                }
            }

            return response;
        }
    }
}
