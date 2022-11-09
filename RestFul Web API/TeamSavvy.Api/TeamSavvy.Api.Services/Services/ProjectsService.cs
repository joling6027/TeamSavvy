using AutoMapper;
using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TeamSavvy.Api.BusinessModel.DataTransferModel;
using TeamSavvy.Api.Entities.Context;
using TeamSavvy.Api.Entities.GenericRepo;
using TeamSavvy.Api.Services.IServices;
using TeamSavvy.Api.Entities.Models;
namespace TeamSavvy.Api.Services.Services
{
    public class ProjectsService : IProjectsService
    {
        #region Private Member Variables
        /// <summary>
        /// Initialise generic data context variable.
        /// </summary>
        private readonly GenericUnitOfWork<TeamSavvyContext> _unitOfWork;
        private readonly IMapper _mapper;
        #endregion
        #region constructor
        public ProjectsService(GenericUnitOfWork<TeamSavvyContext> unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }


        #endregion

        public bool AddProject(ProjectDto project)
        {
            bool isSuccess = false;
            try
            {
                if (project != null)
                {
                    var proj = _mapper.Map<Project>(project);
                    _unitOfWork.Repository<Project>().Insert(proj);
                    _unitOfWork.SaveChanges();
                    isSuccess = true;

                }
            }
            catch (Exception e)
            {
                isSuccess = false;
            }
            return isSuccess;
        }

        public bool AddEmployeeOnProject(EmployeeProjectDto employeeProject)
        {
            bool isSuccess = false;
            try
            {
                if (employeeProject != null)
                {
                    var employeeIsExist = _unitOfWork.Context.EmployeeProject.Where(e => e.EmployeeId == employeeProject.EmployeeId && e.ProjectId == employeeProject.ProjectId && e.Status == false).FirstOrDefault();
                    if (employeeIsExist != null)
                    {
                        employeeIsExist.Status = false;
                        _unitOfWork.Repository<EmployeeProject>().Update(employeeIsExist);
                        _unitOfWork.SaveChanges();
                        isSuccess = true;
                    }
                    else
                    {
                        var employeeProj = _mapper.Map<EmployeeProject>(employeeProject);
                        _unitOfWork.Repository<EmployeeProject>().Insert(employeeProj);
                        _unitOfWork.SaveChanges();
                        isSuccess = true;
                    }
                }
            }
            catch (Exception e)
            {
                isSuccess = false;
            }
            return isSuccess;
        }

        public bool DeleteEmployeeFromProject(int employeeId)
        {
            bool isSuccess = false;
            try
            {
                if (employeeId > 0)
                {
                    var employeeProj = _unitOfWork.Context.EmployeeProject.Where(x => x.EmployeeId == employeeId).FirstOrDefault();
                    employeeProj.Status = false;
                    _unitOfWork.Repository<EmployeeProject>().Update(employeeProj);
                    _unitOfWork.SaveChanges();
                    isSuccess = true;
                }
            }
            catch (Exception e)
            {
                isSuccess = false;
            }

            return isSuccess;
        }

        public bool DeleteProject(int projectId)
        {
            bool isSuccess = false;
            try
            {
                if (projectId > 0)
                {
                    var project = _unitOfWork.Context.Project.Where(x => x.ProjectId == projectId).FirstOrDefault();
                    _unitOfWork.Repository<Project>().Delete(project);
                    _unitOfWork.SaveChanges();
                    isSuccess = true;
                }
            }
            catch (Exception e)
            {
                isSuccess = false;
            }
            return isSuccess;
        }
        public ProjectDto GetProjectById(int projectId)
        {
            ProjectDto project = null;
            try
            {
                var proj = (from pro in _unitOfWork.Context.Project
                            where pro.ProjectId == projectId
                            select new ProjectDto
                            {
                                ProjectId = pro.ProjectId,
                                ProjectBudget = pro.ProjectBudget,
                                ProjectClient = pro.ProjectClient,
                                ProjectDesc = pro.ProjectDesc,
                                ProjectEndDate = pro.ProjectEndDate,
                                ProjectLead = pro.ProjectLead,
                                ProjectManagerId = pro.ProjectManagerId,
                                ProjectManagerName = pro.ProjectManagerName,
                                ProjectName = pro.ProjectName,
                                ProjectStartDate = pro.ProjectStartDate,
                                ProjectTotalEmployees = pro.ProjectTotalEmployees,
                                TotalCompletedCount = pro.TotalCompletedCount,
                                TotalTaskCount = pro.TotalTaskCount
                            }).FirstOrDefault();
                if (proj != null)
                {
                    project = proj;
                }
            }
            catch (Exception e)
            {
                project = null;
            }
            return project;
        }
        public ProjectDto GetProjectByName(string projectName)
        {
            ProjectDto project = null;
            try
            {
                var proj = (from pro in _unitOfWork.Context.Project
                            where pro.ProjectName == projectName
                            select new ProjectDto
                            {
                                ProjectId = pro.ProjectId,
                                ProjectBudget = pro.ProjectBudget,
                                ProjectClient = pro.ProjectClient,
                                ProjectDesc = pro.ProjectDesc,
                                ProjectEndDate = pro.ProjectEndDate,
                                ProjectLead = pro.ProjectLead,
                                ProjectManagerId = pro.ProjectManagerId,
                                ProjectManagerName = pro.ProjectManagerName,
                                ProjectName = pro.ProjectName,
                                ProjectStartDate = pro.ProjectStartDate,
                                ProjectTotalEmployees = pro.ProjectTotalEmployees,
                                TotalCompletedCount = pro.TotalCompletedCount,
                                TotalTaskCount = pro.TotalTaskCount
                            }).FirstOrDefault();
                if (proj != null)
                {
                    project = proj;
                }
            }
            catch (Exception e)
            {
                project = null;
            }
            return project;
        }
        public List<ProjectDto> GetProjects()
        {
            List<ProjectDto> project = null;
            try
            {
                var proj = (from pro in _unitOfWork.Context.Project
                            select new ProjectDto
                            {
                                ProjectId = pro.ProjectId,
                                ProjectBudget = pro.ProjectBudget,
                                ProjectClient = pro.ProjectClient,
                                ProjectDesc = pro.ProjectDesc,
                                ProjectEndDate = pro.ProjectEndDate,
                                ProjectLead = pro.ProjectLead,
                                ProjectManagerId = pro.ProjectManagerId,
                                ProjectManagerName = pro.ProjectManagerName,
                                ProjectName = pro.ProjectName,
                                ProjectStartDate = pro.ProjectStartDate,
                                ProjectTotalEmployees = pro.ProjectTotalEmployees,
                                TotalCompletedCount = pro.TotalCompletedCount,
                                TotalTaskCount = pro.TotalTaskCount
                            }).ToList();
                if (proj != null && proj.Any())
                {
                    project = proj;
                }
            }
            catch (Exception e)
            {
                project = null;
            }
            return project;
        }
        public List<ProjectDto> GetProjectsByEmployeeId(int employeeId)
        {
            List<ProjectDto> project = null;
            try
            {
                var proj = (from pro in _unitOfWork.Context.Project
                            join empPro in _unitOfWork.Context.EmployeeProject on pro.ProjectId equals empPro.ProjectId
                            where empPro.EmployeeId == employeeId
                            select new ProjectDto
                            {
                                ProjectId = pro.ProjectId,
                                ProjectBudget = pro.ProjectBudget,
                                ProjectClient = pro.ProjectClient,
                                ProjectDesc = pro.ProjectDesc,
                                ProjectEndDate = pro.ProjectEndDate,
                                ProjectLead = pro.ProjectLead,
                                ProjectManagerId = pro.ProjectManagerId,
                                ProjectManagerName = pro.ProjectManagerName,
                                ProjectName = pro.ProjectName,
                                ProjectStartDate = pro.ProjectStartDate,
                                ProjectTotalEmployees = pro.ProjectTotalEmployees,
                                TotalCompletedCount = pro.TotalCompletedCount,
                                TotalTaskCount = pro.TotalTaskCount
                            }).ToList();
                if (proj != null && proj.Any())
                {
                    project = proj;
                }
            }
            catch (Exception e)
            {
                project = null;
            }
            return project;
        }
        public bool UpdateProject(ProjectDto project)
        {
            bool isSuccess = false;
            try
            {
                if (project != null)
                {
                    var proj = (from pro in _unitOfWork.Context.Project
                                where pro.ProjectId == project.ProjectId
                                select new ProjectDto
                                {
                                    ProjectId = pro.ProjectId,
                                    ProjectBudget = pro.ProjectBudget,
                                    ProjectClient = pro.ProjectClient,
                                    ProjectDesc = pro.ProjectDesc,
                                    ProjectEndDate = pro.ProjectEndDate,
                                    ProjectLead = pro.ProjectLead,
                                    ProjectManagerId = pro.ProjectManagerId,
                                    ProjectManagerName = pro.ProjectManagerName,
                                    ProjectName = pro.ProjectName,
                                    ProjectStartDate = pro.ProjectStartDate,
                                    ProjectTotalEmployees = pro.ProjectTotalEmployees,
                                    TotalCompletedCount = pro.TotalCompletedCount,
                                    TotalTaskCount = pro.TotalTaskCount
                                }).FirstOrDefault();
                    if (proj != null)
                    {
                        var projUpdate = _mapper.Map<Project>(project);
                        _unitOfWork.Repository<Project>().Update(projUpdate);
                        _unitOfWork.SaveChanges();
                        isSuccess = true;
                    }

                }
            }
            catch (Exception e)
            {
                isSuccess = false;
            }
            return isSuccess;
        }
    }
}