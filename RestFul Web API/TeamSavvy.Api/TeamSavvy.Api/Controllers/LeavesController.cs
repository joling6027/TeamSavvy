using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Net;
using TeamSavvy.Api.BusinessModel.DataTransferModel;
using TeamSavvy.Api.BusinessModel.Helper;
using TeamSavvy.Api.Entities.Controllers;
using TeamSavvy.Api.Services.IServices;
using TeamSavvy.Api.Services.Services;

namespace TeamSavvy.Api.Entities.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeavesController : ControllerBase
    {
        #region Private Member Variables
        private readonly ILogger<LeavesController> _logger;
        private readonly ILeavesService _leavesService ;
        #endregion

        #region Constructors
        public LeavesController(ILeavesService leavesService, ILogger<LeavesController> logger)
        {
            _leavesService = leavesService;
            _logger = logger;
        }
        #endregion

        [Route("leaveId/{leaveId:int}")]
        [HttpGet /*Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = Access.Employee)*/]
        [Produces("application/json")]
        [ProducesResponseType(typeof(ResponseMessage), 200)]
        [ProducesResponseType(typeof(ResponseMessage), 400)]
        [ProducesResponseType(typeof(ResponseMessage), 401)]
        [ProducesResponseType(typeof(ResponseMessage), 404)]
        public ActionResult<EmployeeLeaveDto> GetLeaveById([FromRoute] int leaveId)
        {
            ActionResult response;
            ResponseMessage responseMessage;
            if (leaveId <= 0)
            {
                responseMessage = new ResponseMessage(false, null, new Message(HttpStatusCode.BadRequest, "Please enter valid leave id."));
                response = BadRequest(responseMessage);
            }
            else
            {
                var leave = _leavesService.GetLeaveById(leaveId);
                if (leave == null)
                {
                    response = NotFound(new ResponseMessage(false, null, new Message(HttpStatusCode.NotFound, $"There is no record in database against leave id {leaveId}")));
                }
                else
                {
                    response = Ok(new ResponseMessage(true, leave, new Message(HttpStatusCode.OK)));
                }
            }

            return response;
        }

        [Route("employeeId/{employeeId:int}")]
        [HttpGet /*Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = Access.Employee)*/]
        [Produces("application/json")]
        [ProducesResponseType(typeof(ResponseMessage), 200)]
        [ProducesResponseType(typeof(ResponseMessage), 400)]
        [ProducesResponseType(typeof(ResponseMessage), 401)]
        [ProducesResponseType(typeof(ResponseMessage), 404)]
        public ActionResult<EmployeeLeaveDto> GetLeavesByEmployeeId([FromRoute] int employeeId)
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
                var leaves = _leavesService.GetLeavesByEmployeeId(employeeId);
                if (leaves == null)
                {
                    response = NotFound(new ResponseMessage(false, null, new Message(HttpStatusCode.NotFound, $"There is no record in database against employee id {employeeId}")));
                }
                else
                {
                    response = Ok(new ResponseMessage(true, leaves, new Message(HttpStatusCode.OK)));
                }
            }

            return response;
        }


        [Route("addLeave")]
        [HttpPost]
        [Produces("application/json")]
        [ProducesResponseType(typeof(ResponseMessage), 200)]
        [ProducesResponseType(typeof(ResponseMessage), 400)]
        [ProducesResponseType(typeof(ResponseMessage), 401)]
        [ProducesResponseType(typeof(ResponseMessage), 404)]
        public IActionResult AddLeave([FromBody] EmployeeLeaveDto employeeLeave)
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
                bool isSuccess = _leavesService.AddLeave(employeeLeave);
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


        [Route("updateLeave")]
        [HttpPut]
        [Produces("application/json")]
        [ProducesResponseType(typeof(ResponseMessage), 200)]
        [ProducesResponseType(typeof(ResponseMessage), 400)]
        [ProducesResponseType(typeof(ResponseMessage), 401)]
        [ProducesResponseType(typeof(ResponseMessage), 404)]
        public IActionResult UpdateLeave([FromBody] EmployeeLeaveDto employeeLeave)
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
                bool isSuccess = _leavesService.UpdateLeave(employeeLeave);
                if (!isSuccess)
                {
                    response = NotFound(new ResponseMessage(false, null, new Message(HttpStatusCode.NotFound, "No record is updated in database.")));
                }
                else
                {
                    response = Ok(new ResponseMessage(true, isSuccess, new Message(HttpStatusCode.OK, "Updated! Your record has been updated. success")));
                }
            }

            return response;
        }

        [Route("deleteLeave")]
        [HttpDelete]
        [Produces("application/json")]
        [ProducesResponseType(typeof(ResponseMessage), 200)]
        [ProducesResponseType(typeof(ResponseMessage), 400)]
        [ProducesResponseType(typeof(ResponseMessage), 401)]
        [ProducesResponseType(typeof(ResponseMessage), 404)]
        public IActionResult DeleteLeave([FromRoute] int leaveId)
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
                bool isSuccess = _leavesService.DeleteLeave(leaveId);
                if (!isSuccess)
                {
                    response = NotFound(new ResponseMessage(false, null, new Message(HttpStatusCode.NotFound, "No record is deleted in database.")));
                }
                else
                {
                    response = Ok(new ResponseMessage(true, isSuccess, new Message(HttpStatusCode.OK, "Deleted! Your record has been deleted. success")));
                }
            }

            return response;
        }
    }
}
