using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TeamSavvy.Api.BusinessModel.DataTransferModel;
using TeamSavvy.Api.BusinessModel.DataTransferModel.Teams;
using TeamSavvy.Api.Entities.Context;
using TeamSavvy.Api.Entities.GenericRepo;
using TeamSavvy.Api.Services.IServices;

namespace TeamSavvy.Api.Services.Services
{
    public class TeamsService : ITeamsService
    {
        #region Private Member Variables
        /// <summary>
        /// Initialise generic data context variable.
        /// </summary>
        private readonly GenericUnitOfWork<TeamSavvyContext> _unitOfWork;
        private readonly IMapper _mapper;
        #endregion

        #region constructor
        public TeamsService(GenericUnitOfWork<TeamSavvyContext> unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }


        #endregion

        public List<Teams> GetTeams(int employeeId)
        {
            List<Teams> teams = null;

            try
            {

                var projIds = _unitOfWork.Context.EmployeeProject
                        .Where(e => e.EmployeeId == employeeId).Select(s => s.ProjectId).ToList();

                List<int> empIds = new List<int>();
                foreach(var projId in projIds)
                {
                    var empId = _unitOfWork.Context.EmployeeProject.Where(p => p.ProjectId == projId).Select(e => e.EmployeeId).ToList();
                    empIds.AddRange(empId);
                }

                foreach (var empId in empIds)
                {
                    teams = _unitOfWork.Context.Employee.Where(e => e.EmployeeId == empId)
                            .Select(e => new Teams
                            {
                                Email = e.Email,
                                Extension = e.Extension,
                                Name = e.EmployeeFirstname.Trim() + " " + e.EmployeeLastname.Trim(),
                                Position = _unitOfWork.Context.Role.Where(r => r.RoleId == e.RoleId).FirstOrDefault().RoleType,
                            }).ToList();
                }
                        

            }
            catch(Exception ex)
            {
                teams = null;
            }

            return teams;
        }
    }
}
