using AutoMapper;
using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TeamSavvy.Api.BusinessModel.DashboardModels;
using TeamSavvy.Api.Entities.Context;
using TeamSavvy.Api.Entities.GenericRepo;
using TeamSavvy.Api.Entities.Models;
using TeamSavvy.Api.Services.IServices;
using Project = TeamSavvy.Api.BusinessModel.DashboardModels.Project;

namespace TeamSavvy.Api.Services.Services
{
    public class DashboardService : IDashboardService
    {
        #region Private Member Variables
        /// <summary>
        /// Initialise generic data context variable.
        /// </summary>
        private readonly GenericUnitOfWork<TeamSavvyContext> _unitOfWork;
        private readonly IMapper _mapper;
        #endregion

        #region Constructors

        /// <summary>
        /// Initializes the dependencies of services
        /// </summary>
        /// <param name="unitOfWork">unit of work for repository</param>
        public DashboardService(GenericUnitOfWork<TeamSavvyContext> unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        #endregion

        public List<Project> GetProjects(int managerId)
        {
            List<Project> projects = new List<Project>();
            try
            {
                var proj = _unitOfWork.Context.Project.Where(p => p.ProjectManagerId == managerId).ToList();
                if(proj != null)
                {
                    foreach (var project in proj)
                    {
                        var totalTeamMember = _unitOfWork.Context.EmployeeProject.Where(e => e.ProjectId == project.ProjectId && e.Status == true).ToList().Count();
                        var tasks = _unitOfWork.Context.Task.Where(t => t.ProjectId == project.ProjectId).ToList().Count();
                        projects.Add(new Project
                        {
                            ProjectId = project.ProjectId,
                            ProjectBudget = project.ProjectBudget,
                            ProjectDesc = project.ProjectDesc,
                            ProjectName = project.ProjectName,
                            TotalTasks = tasks,
                            TotalTeamMember = totalTeamMember
                        });
                    }
                }

            }
            catch(Exception ex)
            {
                projects = null;
            }

            return projects;
        }

        public TaskCount GetTaskCount(int projectId)
        {
            TaskCount taskCount = null;
            try
            {
                var tasks = _unitOfWork.Context.Task.Where(t => t.ProjectId == projectId).ToList();
                if(tasks != null)
                {
                    taskCount = new TaskCount
                    {
                        TotalTasks = tasks.Count(),
                        InProgress = tasks.Where(t => t.TaskStatus == "InProgress").Count(),
                        Completed = tasks.Where(t => t.TaskStatus == "Completed").Count(),
                    };
                }
            }
            catch(Exception ex)
            {
                taskCount = null;
            }

            return taskCount;
        }

        public List<TeamMembers> GetTeamMembers(int managerId)
        {
            List<TeamMembers> teamMembers = new List<TeamMembers>();
            try
            {
                var projs = _unitOfWork.Context.Project.Where(p => p.ProjectManagerId == managerId).ToList();
                if(projs != null)
                {
                    foreach (var project in projs)
                    {
                        TeamMembers teamMember = new TeamMembers
                        {
                            ProjectName = project.ProjectName,
                            ProjectId = project.ProjectId
                        };
                        var employees = _unitOfWork.Context.Employee
                                          .Join(_unitOfWork.Context.EmployeeProject,
                                           emp => emp.EmployeeId,
                                           empProj => empProj.EmployeeId,
                                           (emp, empProj) => new { Emp = emp, EmpProj = empProj })
                                          .Where(x => x.EmpProj.ProjectId == project.ProjectId && String.IsNullOrEmpty(x.Emp.Resigneddate))
                                          .Select(x => new { x.Emp, x.EmpProj }).ToList();
                        if(employees != null)
                        {
                           teamMember.EmployeeList = new List<ProjectEmployee>();
                           var totalTask = _unitOfWork.Context.Task.Where(t => t.ProjectId == project.ProjectId).ToList().Count();
                            foreach (var emp in employees)
                            {
                                var tasks = _unitOfWork.Context.Task.Where(t => t.ProjectId == emp.EmpProj.ProjectId && t.EmployeeId == emp.EmpProj.EmployeeId).ToList();
                                var completed = tasks.Where(t => t.TaskStatus == "Completed").Count();
                                var empSalary = _unitOfWork.Context.Salary.Where(s => s.EmployeeId == emp.Emp.EmployeeId).ToList().OrderByDescending(s => s.Employeesalary);
                                int progress = 0;
                                if(totalTask > 0)
                                {
                                    progress = (completed / totalTask)*100;
                                }

                                teamMember.EmployeeList.Add(new ProjectEmployee
                                {
                                    Id = emp.Emp.EmployeeId,
                                    Department = _unitOfWork.Context.Department.Where(x => x.DepartmentId == emp.Emp.DepartmentId).FirstOrDefault().DepartmentName,
                                    EmployeeName = emp.Emp.EmployeeFirstname.Trim() + " " + emp.Emp.EmployeeLastname.Trim(),
                                    Progress = progress,
                                    Salary = empSalary.Select(s => s.Employeesalary).FirstOrDefault(),
                                    Status = emp.EmpProj.Status ? "Active" : "Bench",
                                    Position = _unitOfWork.Context.Role.Where(r => r.RoleId == emp.Emp.RoleId).FirstOrDefault().RoleType,
                                });

                                
                            }
                        }

                        teamMembers.Add(teamMember);
                        
                    }
                }
            }
            catch(Exception ex)
            {
                teamMembers = null;
            }

            return teamMembers;
        }


        public int GetTeamMembersCount(int managerId)
        {
            int totalCount = 0;

            try
            {
                var proj = _unitOfWork.Context.Project.Where(p => p.ProjectManagerId == managerId).ToList();
                if(proj != null)
                {
                    
                    foreach (var project in proj)
                    {
                        totalCount += _unitOfWork.Context.EmployeeProject.Where(p => p.ProjectId == project.ProjectId).Distinct().ToList().Count();
                    }
                }
            }
            catch(Exception ex)
            {
                totalCount = 0;
            }

            return totalCount;
        }

    }
}
