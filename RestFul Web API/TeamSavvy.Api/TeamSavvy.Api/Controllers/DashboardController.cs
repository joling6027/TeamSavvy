using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Net;
using TeamSavvy.Api.BusinessModel.DashboardModels;
using TeamSavvy.Api.BusinessModel.DataTransferModel;
using TeamSavvy.Api.BusinessModel.Helper;
using TeamSavvy.Api.Entities.Controllers;
using TeamSavvy.Api.Services.IServices;

namespace TeamSavvy.Api.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        #region Private Member Variables
        private readonly ILogger<DashboardController> _logger;
        private readonly IDashboardService _dashboardService;
        #endregion
        #region Constructors
        public DashboardController(IDashboardService dashboardService, ILogger<DashboardController> logger)
        {
            _dashboardService = dashboardService;
            _logger = logger;
        }
        #endregion

        [Route("projects/{managerId:int}")]
        [HttpGet /*Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = Access.Employee)*/]
        [Produces("application/json")]
        [ProducesResponseType(typeof(ResponseMessage), 200)]
        [ProducesResponseType(typeof(ResponseMessage), 400)]
        [ProducesResponseType(typeof(ResponseMessage), 401)]
        [ProducesResponseType(typeof(ResponseMessage), 404)]
        public ActionResult<List<Project>> GetProjects([FromRoute] int managerId)
        {
            ActionResult response;
            ResponseMessage responseMessage;
            if (managerId <= 0)
            {
                responseMessage = new ResponseMessage(false, null, new Message(HttpStatusCode.BadRequest, "Please enter valid employee id."));
                response = BadRequest(responseMessage);
            }
            else
            {
                var res = _dashboardService.GetProjects(managerId);
                if (res == null)
                {
                    response = NotFound(new ResponseMessage(false, null, new Message(HttpStatusCode.NotFound, $"There is no record in database against employee id {managerId}")));
                }
                else
                {
                    response = Ok(new ResponseMessage(true, res, new Message(HttpStatusCode.OK)));
                }
            }
            return response;
        }

        [Route("projects")]
        [HttpGet /*Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = Access.Employee)*/]
        [Produces("application/json")]
        [ProducesResponseType(typeof(ResponseMessage), 200)]
        [ProducesResponseType(typeof(ResponseMessage), 400)]
        [ProducesResponseType(typeof(ResponseMessage), 401)]
        [ProducesResponseType(typeof(ResponseMessage), 404)]
        public ActionResult<List<Project>> GetProjects()
        {
            ActionResult response;
            ResponseMessage responseMessage;
           
                var res = _dashboardService.GetProjects();
                if (res == null)
                {
                    response = NotFound(new ResponseMessage(false, null, new Message(HttpStatusCode.NotFound, $"There is no record in database")));
                }
                else
                {
                    response = Ok(new ResponseMessage(true, res, new Message(HttpStatusCode.OK)));
                }
            return response;
        }

        [Route("taskcount/{projectId:int}")]
        [HttpGet /*Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = Access.Employee)*/]
        [Produces("application/json")]
        [ProducesResponseType(typeof(ResponseMessage), 200)]
        [ProducesResponseType(typeof(ResponseMessage), 400)]
        [ProducesResponseType(typeof(ResponseMessage), 401)]
        [ProducesResponseType(typeof(ResponseMessage), 404)]
        public ActionResult<TaskCount> GetTaskCount([FromRoute] int projectId)
        {
            ActionResult response;
            ResponseMessage responseMessage;
            if (projectId <= 0)
            {
                responseMessage = new ResponseMessage(false, null, new Message(HttpStatusCode.BadRequest, "Please enter valid employee id."));
                response = BadRequest(responseMessage);
            }
            else
            {
                var res = _dashboardService.GetTaskCount(projectId);
                if (res == null)
                {
                    response = NotFound(new ResponseMessage(false, null, new Message(HttpStatusCode.NotFound, $"There is no record in database against employee id {projectId}")));
                }
                else
                {
                    response = Ok(new ResponseMessage(true, res, new Message(HttpStatusCode.OK)));
                }
            }
            return response;
        }
        
        [Route("teammembers/{managerId:int}")]
        [HttpGet /*Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = Access.Employee)*/]
        [Produces("application/json")]
        [ProducesResponseType(typeof(ResponseMessage), 200)]
        [ProducesResponseType(typeof(ResponseMessage), 400)]
        [ProducesResponseType(typeof(ResponseMessage), 401)]
        [ProducesResponseType(typeof(ResponseMessage), 404)]
        public ActionResult<List<TeamMembers>> GetTeamMembers([FromRoute] int managerId)
        {
            ActionResult response;
            ResponseMessage responseMessage;
            if (managerId <= 0)
            {
                responseMessage = new ResponseMessage(false, null, new Message(HttpStatusCode.BadRequest, "Please enter valid employee id."));
                response = BadRequest(responseMessage);
            }
            else
            {
                var res = _dashboardService.GetTeamMembers(managerId);
                if (res == null)
                {
                    response = NotFound(new ResponseMessage(false, null, new Message(HttpStatusCode.NotFound, $"There is no record in database against employee id {managerId}")));
                }
                else
                {
                    response = Ok(new ResponseMessage(true, res, new Message(HttpStatusCode.OK)));
                }
            }
            return response;
        }
        
        [Route("teammembers")]
        [HttpGet /*Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = Access.Employee)*/]
        [Produces("application/json")]
        [ProducesResponseType(typeof(ResponseMessage), 200)]
        [ProducesResponseType(typeof(ResponseMessage), 400)]
        [ProducesResponseType(typeof(ResponseMessage), 401)]
        [ProducesResponseType(typeof(ResponseMessage), 404)]
        public ActionResult<List<TeamMembers>> GetTeamMembers()
        {
            ActionResult response;
            ResponseMessage responseMessage;
                var res = _dashboardService.GetTeamMembers();
                if (res == null)
                {
                    response = NotFound(new ResponseMessage(false, null, new Message(HttpStatusCode.NotFound, $"There is no record in database")));
                }
                else
                {
                    response = Ok(new ResponseMessage(true, res, new Message(HttpStatusCode.OK)));
                }
            return response;
        }
        
        [Route("teammemberscount/{managerId:int}")]
        [HttpGet /*Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = Access.Employee)*/]
        [Produces("application/json")]
        [ProducesResponseType(typeof(ResponseMessage), 200)]
        [ProducesResponseType(typeof(ResponseMessage), 400)]
        [ProducesResponseType(typeof(ResponseMessage), 401)]
        [ProducesResponseType(typeof(ResponseMessage), 404)]
        public ActionResult<List<TeamMembers>> GetTeamMembersCount([FromRoute] int managerId)
        {
            ActionResult response;
            ResponseMessage responseMessage;
            if (managerId <= 0)
            {
                responseMessage = new ResponseMessage(false, null, new Message(HttpStatusCode.BadRequest, "Please enter valid employee id."));
                response = BadRequest(responseMessage);
            }
            else
            {
                var res = _dashboardService.GetTeamMembersCount(managerId);
                if (res == null)
                {
                    response = NotFound(new ResponseMessage(false, null, new Message(HttpStatusCode.NotFound, $"There is no record in database against employee id {managerId}")));
                }
                else
                {
                    response = Ok(new ResponseMessage(true, res, new Message(HttpStatusCode.OK)));
                }
            }
            return response;
        }
    }
}
