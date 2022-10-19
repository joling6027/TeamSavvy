using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using TeamSavvy.Api.BusinessModel.DataTransferModel;
using TeamSavvy.Api.BusinessModel.Helper;
using TeamSavvy.Api.Services.IServices;
using TeamSavvy.Api.Utilities.Helper;

namespace TeamSavvy.Api.Entities.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        #region Private Member Variables
        private readonly ILogger<EmployeeController> _logger;
        private readonly IEmployeeService _employeeService;
        #endregion

        #region Constructors
        public EmployeeController(IEmployeeService employeeService, ILogger<EmployeeController> logger)
        {
            _employeeService = employeeService;
            _logger = logger;
        }
        #endregion

        [HttpGet/*, Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = Access.Employee)*/]
        [Produces("application/json")]
        [ProducesResponseType(typeof(ResponseMessage), 200)]
        [ProducesResponseType(typeof(ResponseMessage), 400)]
        [ProducesResponseType(typeof(ResponseMessage), 401)]
        [ProducesResponseType(typeof(ResponseMessage), 404)]
        public ActionResult<EmployeeDto> GetAllEmployees()
        {
            ActionResult response;
            ResponseMessage responseMessage;
            List<EmployeeDto> employeeRecords = _employeeService.GetAllEmployees();
            if (employeeRecords == null || !employeeRecords.Any())
            {
                response = NotFound(new ResponseMessage(false, null, new Message(HttpStatusCode.NotFound, $"There is no record in database.")));
            }
            else
            {
                response = Ok(new ResponseMessage(true, employeeRecords, new Message(HttpStatusCode.OK)));
            }

            return response;
        }

        [Route("{employeeId:int}")]
        [HttpGet /*Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = Access.Employee)*/]
        [Produces("application/json")]
        [ProducesResponseType(typeof(ResponseMessage), 200)]
        [ProducesResponseType(typeof(ResponseMessage), 400)]
        [ProducesResponseType(typeof(ResponseMessage), 401)]
        [ProducesResponseType(typeof(ResponseMessage), 404)]
        public ActionResult<EmployeeDto> GetEmployeeById([FromRoute] int employeeId)
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
                EmployeeDto employeeRecords = _employeeService.GetEmployeeById(employeeId);
                if (employeeRecords == null)
                {
                    response = NotFound(new ResponseMessage(false, null, new Message(HttpStatusCode.NotFound, $"There is no record in database against employee id {employeeId}")));
                }
                else
                {
                    response = Ok(new ResponseMessage(true, employeeRecords, new Message(HttpStatusCode.OK)));
                }
            }

            return response;
        }

        //[Route("{employeeFirstName}")]
        //[HttpGet/*, Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = Access.Employee)*/]
        //[Produces("application/json")]
        //[ProducesResponseType(typeof(ResponseMessage), 200)]
        //[ProducesResponseType(typeof(ResponseMessage), 400)]
        //[ProducesResponseType(typeof(ResponseMessage), 401)]
        //[ProducesResponseType(typeof(ResponseMessage), 404)]
        //public ActionResult<List<EmployeeDto>> GetEmployeesByName([FromRoute] string employeeFirstName)
        //{
        //    ActionResult response;
        //    ResponseMessage responseMessage;
        //    if (string.IsNullOrWhiteSpace(employeeFirstName))
        //    {
        //        responseMessage = new ResponseMessage(false, null, new Message(HttpStatusCode.BadRequest, "Please enter valid employee id."));
        //        response = BadRequest(responseMessage);
        //    }
        //    else
        //    {
        //        List<EmployeeDto> employeeRecords = _employeeService.GetEmployeeByFirstName(employeeFirstName);
        //        if (employeeRecords == null)
        //        {
        //            response = NotFound(new ResponseMessage(false, null, new Message(HttpStatusCode.NotFound, $"There is no record in database against employee id {employeeFirstName}")));
        //        }
        //        else
        //        {
        //            response = Ok(new ResponseMessage(true, employeeRecords, new Message(HttpStatusCode.OK)));
        //        }
        //    }

        //    return response;
        //}

        [Route("addEmployee")]
        [HttpPost]
        [Produces("application/json")]
        [ProducesResponseType(typeof(ResponseMessage), 200)]
        [ProducesResponseType(typeof(ResponseMessage), 400)]
        [ProducesResponseType(typeof(ResponseMessage), 401)]
        [ProducesResponseType(typeof(ResponseMessage), 404)]
        public IActionResult AddEmployeeDetails([FromBody] EmployeeDto employee)
        {
            ActionResult response;
            ResponseMessage responseMessage;
            if (!ModelState.IsValid)
            {
                responseMessage = new ResponseMessage(false, null, new Message(HttpStatusCode.BadRequest, "There is invalid entry in employee record."));
                response = BadRequest(responseMessage);
            }
            else
            {
                bool isSuccess = _employeeService.AddEmployee(employee);
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

        // PUT api/<EmployeeController>/5
        [Route("updateEmployee")]
        [HttpPut]
        [Produces("application/json")]
        [ProducesResponseType(typeof(ResponseMessage), 200)]
        [ProducesResponseType(typeof(ResponseMessage), 400)]
        [ProducesResponseType(typeof(ResponseMessage), 401)]
        [ProducesResponseType(typeof(ResponseMessage), 404)]
        public IActionResult UpdateEmployeeDetails([FromBody] EmployeeDto employee)
        {
            ActionResult response;
            ResponseMessage responseMessage;
            if (!ModelState.IsValid)
            {
                responseMessage = new ResponseMessage(false, null, new Message(HttpStatusCode.BadRequest, "There is invalid entry in employee record."));
                response = BadRequest(responseMessage);
            }
            else
            {
                bool isSuccess = _employeeService.UpdateEmployee(employee);
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

        // DELETE api/<EmployeeController>/5
        [Route("deleteEmployee/{id}/{status}")]
        [HttpDelete]
        [Produces("application/json")]
        [ProducesResponseType(typeof(ResponseMessage), 200)]
        [ProducesResponseType(typeof(ResponseMessage), 400)]
        [ProducesResponseType(typeof(ResponseMessage), 401)]
        [ProducesResponseType(typeof(ResponseMessage), 404)]
        public IActionResult Delete([FromRoute] int id, [FromRoute] string status)
        {
            ActionResult response;
            ResponseMessage responseMessage;
            if (!ModelState.IsValid)
            {
                responseMessage = new ResponseMessage(false, null, new Message(HttpStatusCode.BadRequest, "There is invalid entry in employee record."));
                response = BadRequest(responseMessage);
            }
            else
            {
                bool isSuccess = _employeeService.DeleteEmployee(id, status);
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
