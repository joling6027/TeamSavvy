using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using TeamSavvy.Api.BusinessModel.DataTransferModel;
using TeamSavvy.Api.BusinessModel.DataTransferModel.DropdownDtos;
using TeamSavvy.Api.BusinessModel.Helper;
using TeamSavvy.Api.Entities.Controllers;
using TeamSavvy.Api.Services.IServices;
using TeamSavvy.Api.Services.Services;

namespace TeamSavvy.Api.Entities.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DropdownsController : ControllerBase
    {

        #region Private Member Variables

        /// <summary>
        /// Employee records service interface variable.
        /// </summary>
        private readonly IDropdownsService _dropdownsService;
        private readonly ILogger<DropdownsController> _logger;
        #endregion


        #region Constructors
        public DropdownsController(IDropdownsService dropdownsService, ILogger<DropdownsController> logger)
        {
            _dropdownsService = dropdownsService;
            _logger = logger;
        }
        #endregion

        [Route("countyProvinceCity")]
        [HttpGet/*, Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = Access.Employee)*/]
        [Produces("application/json")]
        [ProducesResponseType(typeof(ResponseMessage), 200)]
        [ProducesResponseType(typeof(ResponseMessage), 400)]
        [ProducesResponseType(typeof(ResponseMessage), 401)]
        [ProducesResponseType(typeof(ResponseMessage), 404)]
        public ActionResult<List<CountryDdl>> GetCountryProvinceCityDd()
        {
                ActionResult response;
                ResponseMessage responseMessage;
                var res = _dropdownsService.GetCountryProvCity();

                if (!res.Any())
                {
                    response = NotFound(new ResponseMessage(false, null, new Message(HttpStatusCode.NotFound, $"There is no record in database.")));
                }
                else
                {
                    response = Ok(new ResponseMessage(true, res, new Message(HttpStatusCode.OK)));
                }

            return response;
        }

        [Route("skills")]
        [HttpGet/*, Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = Access.Employee)*/]
        [Produces("application/json")]
        [ProducesResponseType(typeof(ResponseMessage), 200)]
        [ProducesResponseType(typeof(ResponseMessage), 400)]
        [ProducesResponseType(typeof(ResponseMessage), 401)]
        [ProducesResponseType(typeof(ResponseMessage), 404)]
        public ActionResult<List<CountryDdl>> GetSkills()
        {
            ActionResult response;
            ResponseMessage responseMessage;
            var res = _dropdownsService.GetSkills();

            if (!res.Any())
            {
                response = NotFound(new ResponseMessage(false, null, new Message(HttpStatusCode.NotFound, $"There is no record in database.")));
            }
            else
            {
                response = Ok(new ResponseMessage(true, res, new Message(HttpStatusCode.OK)));
            }

            return response;
        }

    }
}
