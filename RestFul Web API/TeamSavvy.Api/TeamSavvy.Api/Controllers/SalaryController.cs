using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Net;
using TeamSavvy.Api.BusinessModel.DataTransferModel;
using TeamSavvy.Api.BusinessModel.Helper;
using TeamSavvy.Api.Entities.Controllers;
using TeamSavvy.Api.Services.IServices;
using TeamSavvy.Api.Services.Services;

namespace TeamSavvy.Api.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalaryController : ControllerBase
    {
        #region Private Member Variables
        private readonly ILogger<PayrollController> _logger;
        private readonly ISalaryService _salaryService;
        #endregion

        #region Constructors
        public SalaryController(ISalaryService salaryService, ILogger<PayrollController> logger)
        {
            _salaryService = salaryService;
            _logger = logger;
        }
        #endregion


        [Route("employeeId/{employeeId:int}")]
        [HttpGet /*Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = Access.Employee)*/]
        [Produces("application/json")]
        [ProducesResponseType(typeof(ResponseMessage), 200)]
        [ProducesResponseType(typeof(ResponseMessage), 400)]
        [ProducesResponseType(typeof(ResponseMessage), 401)]
        [ProducesResponseType(typeof(ResponseMessage), 404)]
        public ActionResult<SalaryDto> GetSalaryByEmployeeId([FromRoute] int employeeId)
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
                var payroll = _salaryService.GetSalaryByEmployeeId(employeeId);
                if (payroll == null)
                {
                    response = NotFound(new ResponseMessage(false, null, new Message(HttpStatusCode.NotFound, $"There is no record in database against employee id {employeeId}")));
                }
                else
                {
                    response = Ok(new ResponseMessage(true, payroll, new Message(HttpStatusCode.OK)));
                }
            }

            return response;
        }


        [Route("salaryId/{salaryId:int}")]
        [HttpGet /*Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = Access.Employee)*/]
        [Produces("application/json")]
        [ProducesResponseType(typeof(ResponseMessage), 200)]
        [ProducesResponseType(typeof(ResponseMessage), 400)]
        [ProducesResponseType(typeof(ResponseMessage), 401)]
        [ProducesResponseType(typeof(ResponseMessage), 404)]
        public ActionResult<SalaryDto> GetSalaryBySalaryId([FromRoute] int salaryId)
        {
            ActionResult response;
            ResponseMessage responseMessage;
            if (salaryId <= 0)
            {
                responseMessage = new ResponseMessage(false, null, new Message(HttpStatusCode.BadRequest, "Please enter valid employee id."));
                response = BadRequest(responseMessage);
            }
            else
            {
                var payroll = _salaryService.GetSalaryBySalaryId(salaryId);
                if (payroll == null)
                {
                    response = NotFound(new ResponseMessage(false, null, new Message(HttpStatusCode.NotFound, $"There is no record in database against employee id {salaryId}")));
                }
                else
                {
                    response = Ok(new ResponseMessage(true, payroll, new Message(HttpStatusCode.OK)));
                }
            }

            return response;
        }

        [Route("addSalary")]
        [HttpPost]
        [Produces("application/json")]
        [ProducesResponseType(typeof(ResponseMessage), 200)]
        [ProducesResponseType(typeof(ResponseMessage), 400)]
        [ProducesResponseType(typeof(ResponseMessage), 401)]
        [ProducesResponseType(typeof(ResponseMessage), 404)]
        public IActionResult AddPayroll([FromBody] SalaryDto salary)
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
                bool isSuccess = _salaryService.AddSalary(salary);
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

        [Route("deleteSalary")]
        [HttpDelete]
        [Produces("application/json")]
        [ProducesResponseType(typeof(ResponseMessage), 200)]
        [ProducesResponseType(typeof(ResponseMessage), 400)]
        [ProducesResponseType(typeof(ResponseMessage), 401)]
        [ProducesResponseType(typeof(ResponseMessage), 404)]
        public IActionResult DeletePayroll([FromRoute] int salaryId)
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
                bool isSuccess = _salaryService.DeleteSalary(salaryId);
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