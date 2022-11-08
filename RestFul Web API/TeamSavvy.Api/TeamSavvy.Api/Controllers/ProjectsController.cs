using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using TeamSavvy.Api.BusinessModel.DataTransferModel;
using TeamSavvy.Api.BusinessModel.Helper;
using TeamSavvy.Api.Services.IServices;
using TeamSavvy.Api.Services.Services;

namespace TeamSavvy.Api.Entities.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        #region Private Member Variables
        private readonly ILogger<ProjectsController> _logger;
        private readonly IProjectsService _projectsService;
        #endregion

        #region Constructors
        public ProjectsController(IProjectsService projectsService, ILogger<ProjectsController> logger)
        {
            _projectsService = projectsService;
            _logger = logger;
        }
        #endregion

        [HttpGet/*, Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = Access.Employee)*/]
        [Produces("application/json")]
        [ProducesResponseType(typeof(ResponseMessage), 200)]
        [ProducesResponseType(typeof(ResponseMessage), 400)]
        [ProducesResponseType(typeof(ResponseMessage), 401)]
        [ProducesResponseType(typeof(ResponseMessage), 404)]
        public ActionResult<List<ProjectDto>> GetAllProjects()
        {
            ActionResult response;
            ResponseMessage responseMessage;
            var projects = _projectsService.GetProjects();
            if (projects == null || !projects.Any())
            {
                response = NotFound(new ResponseMessage(false, null, new Message(HttpStatusCode.NotFound, $"There is no record in database.")));
            }
            else
            {
                response = Ok(new ResponseMessage(true, projects, new Message(HttpStatusCode.OK)));
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
        public ActionResult<List<ProjectDto>> GetProjectByEmployeeId([FromRoute] int employeeId)
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
                var projects = _projectsService.GetProjectsByEmployeeId(employeeId);
                if (projects == null && !projects.Any())
                {
                    response = NotFound(new ResponseMessage(false, null, new Message(HttpStatusCode.NotFound, $"There is no record in database against employee id {employeeId}")));
                }
                else
                {
                    response = Ok(new ResponseMessage(true, projects, new Message(HttpStatusCode.OK)));
                }
            }

            return response;
        }

        [Route("{projectName}")]
        [HttpGet/*, Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = Access.Employee)*/]
        [Produces("application/json")]
        [ProducesResponseType(typeof(ResponseMessage), 200)]
        [ProducesResponseType(typeof(ResponseMessage), 400)]
        [ProducesResponseType(typeof(ResponseMessage), 401)]
        [ProducesResponseType(typeof(ResponseMessage), 404)]
        public ActionResult<ProjectDto> GetProjectByName([FromRoute] string projectName)
        {
            ActionResult response;
            ResponseMessage responseMessage;
            if (string.IsNullOrWhiteSpace(projectName))
            {
                responseMessage = new ResponseMessage(false, null, new Message(HttpStatusCode.BadRequest, "Please enter valid project name."));
                response = BadRequest(responseMessage);
            }
            else
            {
                var project = _projectsService.GetProjectByName(projectName);
                if (project == null)
                {
                    response = NotFound(new ResponseMessage(false, null, new Message(HttpStatusCode.NotFound, $"There is no record in database against project name {projectName}")));
                }
                else
                {
                    response = Ok(new ResponseMessage(true, project, new Message(HttpStatusCode.OK)));
                }
            }

            return response;
        }

        [Route("projectId/{projectId:int}")]
        [HttpGet /*Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = Access.Employee)*/]
        [Produces("application/json")]
        [ProducesResponseType(typeof(ResponseMessage), 200)]
        [ProducesResponseType(typeof(ResponseMessage), 400)]
        [ProducesResponseType(typeof(ResponseMessage), 401)]
        [ProducesResponseType(typeof(ResponseMessage), 404)]
        public ActionResult<ProjectDto> GetProjectByProjectId([FromRoute] int projectId)
        {
            ActionResult response;
            ResponseMessage responseMessage;
            if (projectId <= 0)
            {
                responseMessage = new ResponseMessage(false, null, new Message(HttpStatusCode.BadRequest, "Please enter valid project id."));
                response = BadRequest(responseMessage);
            }
            else
            {
                var projects = _projectsService.GetProjectById(projectId);
                if (projects == null)
                {
                    response = NotFound(new ResponseMessage(false, null, new Message(HttpStatusCode.NotFound, $"There is no record in database against project id {projectId}")));
                }
                else
                {
                    response = Ok(new ResponseMessage(true, projects, new Message(HttpStatusCode.OK)));
                }
            }

            return response;
        }


        [Route("addProject")]
        [HttpPost]
        [Produces("application/json")]
        [ProducesResponseType(typeof(ResponseMessage), 200)]
        [ProducesResponseType(typeof(ResponseMessage), 400)]
        [ProducesResponseType(typeof(ResponseMessage), 401)]
        [ProducesResponseType(typeof(ResponseMessage), 404)]
        public ActionResult<ProjectDto> AddProject([FromBody] ProjectDto project)
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
                bool isSuccess = _projectsService.AddProject(project);
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
        [Route("updateProject")]
        [HttpPut]
        [Produces("application/json")]
        [ProducesResponseType(typeof(ResponseMessage), 200)]
        [ProducesResponseType(typeof(ResponseMessage), 400)]
        [ProducesResponseType(typeof(ResponseMessage), 401)]
        [ProducesResponseType(typeof(ResponseMessage), 404)]
        public IActionResult UpdateProject([FromBody] ProjectDto project)
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
                bool isSuccess = _projectsService.UpdateProject(project);
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
        [Route("deleteProject/{projectId}")]
        [HttpDelete]
        [Produces("application/json")]
        [ProducesResponseType(typeof(ResponseMessage), 200)]
        [ProducesResponseType(typeof(ResponseMessage), 400)]
        [ProducesResponseType(typeof(ResponseMessage), 401)]
        [ProducesResponseType(typeof(ResponseMessage), 404)]
        public IActionResult DeleteProject([FromRoute] int projectId)
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
                bool isSuccess = _projectsService.DeleteProject(projectId);
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
