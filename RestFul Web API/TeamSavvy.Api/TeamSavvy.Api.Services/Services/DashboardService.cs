using AutoMapper;
using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using TeamSavvy.Api.BusinessModel.DashboardModels;
using TeamSavvy.Api.BusinessModel.DataTransferModel;
using TeamSavvy.Api.BusinessModel.DataTransferModel.Charts;
using TeamSavvy.Api.Entities.Context;
using TeamSavvy.Api.Entities.GenericRepo;
using TeamSavvy.Api.Entities.Models;
using TeamSavvy.Api.Services.IServices;
using Project = TeamSavvy.Api.BusinessModel.DashboardModels.Project;
using Role = TeamSavvy.Api.Utilities.Helper.Role;

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

        public List<LeaveApproval> GetEmployeesLeavesByManagerId(int managerId)
        {
            List<LeaveApproval> leaveApprovals = new List<LeaveApproval>();
            try
            {
                var projs = _unitOfWork.Context.Project.Where(p => p.ProjectManagerId == managerId).ToList();
                if(projs != null)
                {
                    foreach (var item in projs)
                    {
                        var empIds = _unitOfWork.Context.EmployeeProject.Where(p => p.ProjectId == item.ProjectId).ToList();

                        if(empIds != null)
                        {
                            foreach (var empId in empIds)
                            {
                                if(empId.EmployeeId != managerId)
                                {
                                      var leaves = _unitOfWork.Context.Employee
                                      .Join(_unitOfWork.Context.EmployeeLeave,
                                       emp => emp.EmployeeId,
                                       lev => lev.EmployeeId,
                                       (emp, lev) => new { Emp = emp, Leave = lev })
                                      .Where(x => x.Emp.EmployeeId == empId.EmployeeId && String.IsNullOrEmpty(x.Leave.LeaveStatus))
                                      .Select(x => new LeaveApproval
                                      {
                                          EmployeeId = x.Emp.EmployeeId,
                                          EmployeeName = x.Emp.EmployeeFirstname.Trim() + " " + x.Emp.EmployeeLastname.Trim(),
                                          Email = x.Emp.Email.Trim(),
                                          Department = _unitOfWork.Context.Department.Where(y => y.DepartmentId == x.Emp.DepartmentId).Select(x => x.DepartmentName).FirstOrDefault(),
                                          Extension = x.Emp.Extension,
                                          Role = _unitOfWork.Context.Role.Where(y => y.RoleId == x.Emp.RoleId).Select(x => x.RoleType).FirstOrDefault(),
                                          EmployeeImage = x.Emp.EmployeeImage,
                                          ProjectName = item.ProjectName,
                                          Id = x.Leave.EmployeeLeaveId,
                                          LeaveType = _unitOfWork.Context.Leave.Where(j => j.LeaveTypeId == x.Leave.LeaveTypeId).FirstOrDefault().LeaveType,
                                          TotalLeaveDays = x.Leave.LeaveDays,
                                          LeaveStartDate = x.Leave.LeaveStart,
                                          LeaveEndDate = x.Leave.LeaveEnds,
                                      }).ToList();
                                   //= _unitOfWork.Context.EmployeeLeave.Where(e => e.EmployeeId == empId.EmployeeId && String.IsNullOrEmpty(e.LeaveStatus)).FirstOrDefault();
                                    if (leaves != null)
                                    {
                                        foreach (var leave in leaves)
                                        {
                                            leaveApprovals.Add(leave);
                                        }
                                    }

                                }
                            }
                        }
                    }
                }
            }
            catch(Exception ex)
            {
                leaveApprovals = null;
            }

            return leaveApprovals;
        }

        public List<LeaveApproval> GetEmployeesLeaves()
        {
            List<LeaveApproval> leaveApprovals = new List<LeaveApproval>();
            try
            {
                var emps = _unitOfWork.Context.Employee.Where(e => e.StatusId == 1 && String.IsNullOrEmpty(e.Resigneddate)).ToList();
                if (emps != null)
                {
                    //foreach (var item in projs)
                    //{
                        //var empIds = _unitOfWork.Context.EmployeeProject.Where(p => p.ProjectId == item.ProjectId).ToList();

                        //if (empIds != null)
                        //{
                            foreach (var emp in emps)
                            {
                                string projName = String.Empty;
                                var hrRole = _unitOfWork.Context.Role.Where(r => r.RoleType == Role.HR).FirstOrDefault().RoleId;
                                if(emp.RoleId != hrRole)
                                {
                                    var proj = _unitOfWork.Context.EmployeeProject.Where(p => p.EmployeeId == emp.EmployeeId && p.Status == true).Select(e => e.ProjectId).FirstOrDefault();
                                    projName = _unitOfWork.Context.Project.Where(p => p.ProjectId == proj).Select(p => p.ProjectName).FirstOrDefault();
                                }
                                else
                                {
                                   projName = "Company HR";
                                }
                           var leaves = _unitOfWork.Context.Employee
                          .Join(_unitOfWork.Context.EmployeeLeave,
                           emp => emp.EmployeeId,
                           lev => lev.EmployeeId,
                           (emp, lev) => new { Emp = emp, Leave = lev })
                          .Where(x => x.Emp.EmployeeId == emp.EmployeeId && String.IsNullOrEmpty(x.Leave.LeaveStatus))
                          .Select(x => new LeaveApproval
                          {
                              EmployeeId = x.Emp.EmployeeId,
                              EmployeeName = x.Emp.EmployeeFirstname.Trim() + " " + x.Emp.EmployeeLastname.Trim(),
                              Email = x.Emp.Email.Trim(),
                              Department = _unitOfWork.Context.Department.Where(y => y.DepartmentId == x.Emp.DepartmentId).Select(x => x.DepartmentName).FirstOrDefault(),
                              Extension = x.Emp.Extension,
                              Role = _unitOfWork.Context.Role.Where(y => y.RoleId == x.Emp.RoleId).Select(x => x.RoleType).FirstOrDefault(),
                              EmployeeImage = x.Emp.EmployeeImage,
                              ProjectName = projName,
                              Id = x.Leave.EmployeeLeaveId,
                              LeaveType = _unitOfWork.Context.Leave.Where(j => j.LeaveTypeId == x.Leave.LeaveTypeId).FirstOrDefault().LeaveType,
                              TotalLeaveDays = x.Leave.LeaveDays,
                              LeaveStartDate = x.Leave.LeaveStart,
                              LeaveEndDate = x.Leave.LeaveEnds,
                          }).ToList();
                                //= _unitOfWork.Context.EmployeeLeave.Where(e => e.EmployeeId == empId.EmployeeId && String.IsNullOrEmpty(e.LeaveStatus)).FirstOrDefault();
                                if (leaves != null)
                                {
                                    foreach (var leave in leaves)
                                    {
                                        leaveApprovals.Add(leave);
                                    }
                                }

                            }
                        }
                    //}
                //}
            }
            catch (Exception ex)
            {
                leaveApprovals = null;
            }

            return leaveApprovals;
        }
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
                            Id = project.ProjectId,
                            ProjectManagerId = project.ProjectManagerId,
                            ProjectManagerName = project.ProjectManagerName,
                            Budget = project.ProjectBudget,
                            Description = project.ProjectDesc,
                            ProjectName = project.ProjectName,
                            Tasks = tasks,
                            Team = totalTeamMember
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

        public List<Project> GetProjects()
        {
            List<Project> projects = new List<Project>();
            try
            {
                var proj = _unitOfWork.Context.Project.ToList();
                if (proj != null)
                {
                    foreach (var project in proj)
                    {
                        var totalTeamMember = _unitOfWork.Context.EmployeeProject.Where(e => e.ProjectId == project.ProjectId && e.Status == true).ToList().Count();
                        var tasks = _unitOfWork.Context.Task.Where(t => t.ProjectId == project.ProjectId).ToList().Count();
                        projects.Add(new Project
                        {
                            Id = project.ProjectId,
                            ProjectManagerId = project.ProjectManagerId,
                            ProjectManagerName = project.ProjectManagerName,
                            Budget = project.ProjectBudget,
                            Description = project.ProjectDesc,
                            ProjectName = project.ProjectName,
                            Tasks = tasks,
                            Team = totalTeamMember
                        });
                    }
                }

            }
            catch (Exception ex)
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
                           //var totalTask = _unitOfWork.Context.Task.Where(t => t.ProjectId == project.ProjectId).ToList().Count();
                            foreach (var emp in employees)
                            {
                                var tasks = _unitOfWork.Context.Task.Where(t => t.ProjectId == emp.EmpProj.ProjectId && t.EmployeeId == emp.EmpProj.EmployeeId).ToList();
                                var totalTask = tasks.Count();
                                var completed = tasks.Where(t => t.TaskStatus == "Completed").Count();
                                var empSalary = _unitOfWork.Context.Salary.Where(s => s.EmployeeId == emp.Emp.EmployeeId).ToList().OrderByDescending(s => s.Employeesalary);
                                int progress = 0;
                                if(totalTask > 0)
                                {
                                    progress = ((int)((completed / (float)totalTask)*100));
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


        public List<Employees> GetTeamMembers()
        {
            List<Employees> employees = new List<Employees>();
            try
            {
                var emps = _unitOfWork.Context.Employee.Where(e=> e.StatusId == 1 && String.IsNullOrWhiteSpace(e.Resigneddate)).ToList();
                foreach (var emp in emps)
                {
                    var empProj = _unitOfWork.Context.EmployeeProject.Where(p => p.EmployeeId == emp.EmployeeId && p.Status == true).ToList();
                    if(empProj.Any())
                    {
                        foreach (var emProj in empProj)
                        {
                            var tasks = _unitOfWork.Context.Task.Where(t => t.ProjectId == emProj.ProjectId && t.EmployeeId == emp.EmployeeId).ToList();
                            var totalTask = tasks.Count();
                            var completed = tasks.Where(t => t.TaskStatus == "Completed").Count();
                            var empSalary = _unitOfWork.Context.Salary.Where(s => s.EmployeeId == emp.EmployeeId).ToList().OrderByDescending(s => s.Employeesalary);
                            int progress = 0;
                            if (totalTask > 0)
                            {
                                progress = ((int)((completed / (float)totalTask) * 100));
                            }
                            employees.Add(new Employees
                            {
                                Id = emp.EmployeeId,
                                Department = _unitOfWork.Context.Department.Where(x => x.DepartmentId == emp.DepartmentId).FirstOrDefault().DepartmentName,
                                EmployeeName = emp.EmployeeFirstname.Trim() + " " + emp.EmployeeLastname.Trim(),
                                Progress = progress,
                                Salary = empSalary.Select(s => s.Employeesalary).FirstOrDefault(),
                                Status = emProj.Status ? "Active" : "Bench",
                                Position = _unitOfWork.Context.Role.Where(r => r.RoleId == emp.RoleId).FirstOrDefault().RoleType,
                            });
                        }
                    }
                    else
                    {
                        var empSalary = _unitOfWork.Context.Salary.Where(s => s.EmployeeId == emp.EmployeeId).ToList().OrderByDescending(s => s.Employeesalary);
                        employees.Add(new Employees
                        {
                            Id = emp.EmployeeId,
                            Department = _unitOfWork.Context.Department.Where(x => x.DepartmentId == emp.DepartmentId).FirstOrDefault().DepartmentName,
                            EmployeeName = emp.EmployeeFirstname.Trim() + " " + emp.EmployeeLastname.Trim(),
                            Progress = 0,
                            Salary = empSalary.Select(s => s.Employeesalary).FirstOrDefault(),
                            Status = "Bench",
                            Position = _unitOfWork.Context.Role.Where(r => r.RoleId == emp.RoleId).FirstOrDefault().RoleType,
                        });
                    }

                }
                //var projs = _unitOfWork.Context.Project.ToList();
                //if (projs != null)
                //{
                //    foreach (var project in projs)
                //    {
                //        TeamMembers teamMember = new TeamMembers
                //        {
                //            ProjectName = project.ProjectName,
                //            ProjectId = project.ProjectId
                //        };
                //        var employees = _unitOfWork.Context.Employee
                //                          .Join(_unitOfWork.Context.EmployeeProject,
                //                           emp => emp.EmployeeId,
                //                           empProj => empProj.EmployeeId,
                //                           (emp, empProj) => new { Emp = emp, EmpProj = empProj })
                //                          .Where(x => x.EmpProj.ProjectId == project.ProjectId && String.IsNullOrEmpty(x.Emp.Resigneddate))
                //                          .Select(x => new { x.Emp, x.EmpProj }).ToList();
                //        if (employees != null)
                //        {
                //            teamMember.EmployeeList = new List<ProjectEmployee>();
                //            var totalTask = _unitOfWork.Context.Task.Where(t => t.ProjectId == project.ProjectId).ToList().Count();
                //            foreach (var emp in employees)
                //            {
                //                var z = _unitOfWork.Context.Task.Where(t => t.ProjectId == emp.EmpProj.ProjectId && t.EmployeeId == emp.EmpProj.EmployeeId).ToList();
                //                var completed = tasks.Where(t => t.TaskStatus == "Completed").Count();
                //                var empSalary = _unitOfWork.Context.Salary.Where(s => s.EmployeeId == emp.Emp.EmployeeId).ToList().OrderByDescending(s => s.Employeesalary);
                //                int progress = 0;
                //                if (totalTask > 0)
                //                {
                //                    progress = ((int)((completed / (float)totalTask) * 100));
                //                }

                //                teamMember.EmployeeList.Add(new ProjectEmployee
                //                {
                //                    Id = emp.Emp.EmployeeId,
                //                    Department = _unitOfWork.Context.Department.Where(x => x.DepartmentId == emp.Emp.DepartmentId).FirstOrDefault().DepartmentName,
                //                    EmployeeName = emp.Emp.EmployeeFirstname.Trim() + " " + emp.Emp.EmployeeLastname.Trim(),
                //                    Progress = progress,
                //                    Salary = empSalary.Select(s => s.Employeesalary).FirstOrDefault(),
                //                    Status = emp.EmpProj.Status ? "Active" : "Bench",
                //                    Position = _unitOfWork.Context.Role.Where(r => r.RoleId == emp.Emp.RoleId).FirstOrDefault().RoleType,
                //                });


                //            }
                //        }

                //        teamMembers.Add(teamMember);

                //    }
                //}
            }
            catch (Exception ex)
            {
                employees = null;
            }

            return employees;
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

        public Chart GetTopFiveProjects()
        {
            Chart chart = new Chart();

            try
            {
                chart.Labels = new List<string>();
                chart.Data = new List<object>();
                var res = _unitOfWork.Context.Project.OrderByDescending(p => p.ProjectBudget).ToList().Take(5);

                foreach (var item in res)
                {
                    chart.Labels.Add(item.ProjectName);
                    chart.Data.Add(Int32.Parse(item.ProjectBudget));
                }
            }
            catch(Exception ex)
            {
                chart = new Chart();
            }

            return chart;
        }

        public int GetDashBoardId(int employeeId)
        {
           var res =  _unitOfWork.Context.Dashboard.Where(x => x.EmployeeId == employeeId).FirstOrDefault();
           if(res != null)
           {
                return res.DashboardId;
           }
           return 0;
        }

        public List<DashboardWidget> GetWidegts(int employeeId)
        {
            List<DashboardWidget> widgt = new List<DashboardWidget>();
            var dashboardId = _unitOfWork.Context.Dashboard.Where(d => d.EmployeeId == employeeId).FirstOrDefault().DashboardId;
            if (dashboardId > 0) 
            {
                var widgets = _unitOfWork.Context.Widget.Where(w => w.DashboardId == dashboardId).ToList();
                if (widgets.Count > 0)
                {
                    foreach (var widget in widgets)
                    {
                        DashboardWidget dashboardWidget = new DashboardWidget
                        {
                            DashboardId = widget.DashboardId,
                            Queries = widget.Queries,
                            Selection = widget.Selection,
                            CreatedOn = widget.CreatedOn,
                            CreatedBy = widget.CreatedBy,
                            WidgetId = widget.WidgetId
                        };
                        
                        switch (widget.Selection)
                        {
                            case "0":
                                dashboardWidget.Chart = GetProjectsRelatedCharts(widget.Queries);
                                break;
                            case "1":
                                dashboardWidget.Chart = GetEmployeesRelatedCharts(widget.Queries);
                                break;
                            default:
                                widgt.Add(new DashboardWidget());
                                break;
                        }
                        widgt.Add(dashboardWidget);
                    }
                }
            }

            return widgt;
        }

        public bool AddWidget(WidgetDto widget)
        {
            bool isSuccess = false;
            try
            {
                if (widget != null)
                {
                    var widgt = _mapper.Map<Widget>(widget);
                    if (widgt != null)
                    {
                        _unitOfWork.Repository<Widget>().Insert(widgt);
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
        public bool DeleteWidget(int widgetId)
        {
            bool isSuccess = false;
            try
            {
                if (widgetId > 0)
                {
                    var widget = _unitOfWork.Context.Widget.Where(x => x.WidgetId == widgetId).FirstOrDefault();
                    if (widget != null)
                    {
                        _unitOfWork.Repository<Widget>().Delete(widget);
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
        private Chart GetProjectsRelatedCharts(string queries)
        {
            Chart chart = new Chart();
            switch(queries)
            {
                case "p-1":
                    chart = GetTopFiveProjectsLowestBudget();
                    break;
                case "p-2":
                    chart = GetTopFiveProjectsHighestProformance();
                    break;
                case "p-3":
                    chart = GetTopFiveProjectsLowestProformance();
                    break;
                case "p-4":
                    chart = GetNumberOfProjectsRelatedToClient();
                    break;
                case "p-5":
                    chart = GetTopFiveProjectsWithHigestTeam();
                    break;
                case "p-6":
                    chart = GetTopFiveProjectsWithLowestTeam();
                    break;
                //case "p-7":
                //    chart = GetProjectsWithResToNumSickLeave();
                //    break;
                case "p-7":
                    chart = GetProjectsWithNearestDeadline();
                    break;
            }
            return chart;
        }
        private Chart GetEmployeesRelatedCharts(string queries)
        {
            Chart chart = new Chart();
            switch (queries)
            {
                //case "e-1":
                //    chart = TopFiveEmpWithMinLeaveWithRespToProj();
                //    break;
                //case "e-2":
                //    chart = TopFiveEmpWithMaxLeaveWithRespToProj();
                //    break;
                case "e-1":
                    chart = TopFiveEmpWithMaxSkills();
                    break;
                case "e-2":
                    chart = TopFiveEmpWithMinSkills();
                    break;
                case "e-3":
                    chart = NumOfEmpWorkingInEachJobLoc();
                    break;
                case "e-4":
                    chart = NumOfEmpWorkingInEachDept();
                    break;
            }
            return chart;
        }
        private Chart GetTopFiveProjectsLowestBudget()
        {
            Chart chart = new Chart();

            try
            {
                chart.Labels = new List<string>();
                chart.Data = new List<object>();
                var res = _unitOfWork.Context.Project.OrderBy(p => p.ProjectBudget).ToList().Take(5);

                foreach (var item in res)
                {
                    chart.Labels.Add(item.ProjectName);
                    chart.Data.Add(Int32.Parse(item.ProjectBudget));
                }
            }
            catch (Exception ex)
            {
                chart = new Chart();
            }

            return chart;
        }
        private Chart GetTopFiveProjectsHighestProformance()
        {
            Chart chart = new Chart();

            try
            {
                chart.Labels = new List<string>();
                chart.Data = new List<object>();
                List<ProjectPerformace> performaces = new List<ProjectPerformace>();
                var projs = (from task in _unitOfWork.Context.Task
                               group task by task.ProjectId into tsk
                               select new { tsk.Key, count = tsk.Count() }).ToList();
                foreach (var proj in projs)
                {
                    var name = _unitOfWork.Context.Project.Where(p => p.ProjectId == proj.Key).FirstOrDefault().ProjectName;
                    var completedCount = _unitOfWork.Context.Task.Where(t => t.ProjectId == proj.Key && t.TaskStatus == "Completed").Count();
                    var progress = ((completedCount / (float)proj.count) * 100);
                    performaces.Add(new ProjectPerformace
                    {
                        ProjectName = name,
                        Progress = progress
                    });
                }

                var projectHighestProf = performaces.OrderByDescending( p=>p.Progress).Take(5).ToList();
                foreach(var project in projectHighestProf)
                {
                    chart.Labels.Add(project.ProjectName);
                    chart.Data.Add((int)project.Progress);
                }
            }
            catch (Exception ex)
            {
                chart = new Chart();
            }

            return chart;
        }
        private Chart GetTopFiveProjectsLowestProformance()
        {
            Chart chart = new Chart();

            try
            {
                chart.Labels = new List<string>();
                chart.Data = new List<object>();
                List<ProjectPerformace> performaces = new List<ProjectPerformace>();
                var projs = (from task in _unitOfWork.Context.Task
                             group task by task.ProjectId into tsk
                             select new { tsk.Key, count = tsk.Count() }).ToList();
                foreach (var proj in projs)
                {
                    var name = _unitOfWork.Context.Project.Where(p => p.ProjectId == proj.Key).FirstOrDefault().ProjectName;
                    var completedCount = _unitOfWork.Context.Task.Where(t => t.ProjectId == proj.Key && t.TaskStatus == "Completed").Count();
                    var progress = ((completedCount / (float)proj.count) * 100);
                    performaces.Add(new ProjectPerformace
                    {
                        ProjectName = name,
                        Progress = progress
                    });
                }

                var projectHighestProf = performaces.OrderBy(p => p.Progress).Take(5).ToList();
                foreach (var project in projectHighestProf)
                {
                    chart.Labels.Add(project.ProjectName);
                    chart.Data.Add((int)project.Progress);
                }
            }
            catch (Exception ex)
            {
                chart = new Chart();
            }

            return chart;
        }
        private Chart GetNumberOfProjectsRelatedToClient()
        {
            Chart chart = new Chart();

            try
            {
                chart.Labels = new List<string>();
                chart.Data = new List<object>();
                var clients = (from proj in _unitOfWork.Context.Project
                            group proj by proj.ProjectClient into client
                            select new { client.Key, count = client.Count() }).ToList();
                foreach (var client in clients)
                {

                    chart.Labels.Add(client.Key);
                    chart.Data.Add(client.count);
                }
            }
            catch (Exception ex)
            {
                chart = new Chart();
            }

            return chart;
        }
        private Chart GetTopFiveProjectsWithHigestTeam()
        {
            Chart chart = new Chart();

            try
            {
                chart.Labels = new List<string>();
                chart.Data = new List<object>();
                var projs = (from proj in _unitOfWork.Context.EmployeeProject
                            group proj by proj.ProjectId into projId
                            select new { projId.Key, count = projId.Count() }).OrderByDescending(x => x.count).Take(5).ToList();
                foreach (var proj in projs)
                {
                    var name = _unitOfWork.Context.Project.Where(p => p.ProjectId == proj.Key).FirstOrDefault().ProjectName;
                    chart.Labels.Add(name);
                    chart.Data.Add(proj.count);
                }
            }
            catch (Exception ex)
            {
                chart = new Chart();
            }

            return chart;
        }
        private Chart GetTopFiveProjectsWithLowestTeam()
        {
            Chart chart = new Chart();

            try
            {
                chart.Labels = new List<string>();
                chart.Data = new List<object>();
                var projs = (from proj in _unitOfWork.Context.EmployeeProject
                             group proj by proj.ProjectId into projId
                             select new { projId.Key, count = projId.Count() }).OrderBy(x => x.count).Take(5).ToList();
                foreach (var proj in projs)
                {
                    var name = _unitOfWork.Context.Project.Where(p => p.ProjectId == proj.Key).FirstOrDefault().ProjectName;
                    chart.Labels.Add(name);
                    chart.Data.Add(proj.count);
                }
            }
            catch (Exception ex)
            {
                chart = new Chart();
            }

            return chart;
        }
        private Chart GetProjectsWithResToNumSickLeave()
        {
            Chart chart = new Chart();

            try
            {
               
            }
            catch (Exception ex)
            {
                chart = new Chart();
            }

            return chart;
        }
        private Chart GetProjectsWithNearestDeadline()
        {
            Chart chart = new Chart();

            try
            {
                chart.Labels = new List<string>();
                chart.Data = new List<object>();
                var currDate = DateTime.Today;
                DateTime thisDateNextYear, thisDateLastYear;
                thisDateNextYear = currDate.AddYears(1);
                thisDateLastYear = currDate.AddYears(-1);
                var projs = _unitOfWork.Context.Project.ToList();
                foreach(var proj in projs)
                {
                    if (DateTime.Parse(proj.ProjectEndDate, CultureInfo.InvariantCulture).Year > thisDateLastYear.Year && DateTime.Parse(proj.ProjectEndDate, CultureInfo.InvariantCulture).Year< thisDateNextYear.Year)
                    {
                        if (DateTime.Parse(proj.ProjectEndDate, CultureInfo.InvariantCulture).Month >= thisDateLastYear.Month)
                        {
                            if (DateTime.Parse(proj.ProjectEndDate, CultureInfo.InvariantCulture).Day >= thisDateLastYear.Day)
                            {
                                chart.Labels.Add(proj.ProjectName);
                                chart.Data.Add(DateTime.Parse(proj.ProjectEndDate, CultureInfo.InvariantCulture));
                            }
                        }
                        
                    }
                }
            }
            catch (Exception ex)
            {
                chart = new Chart();
            }

            return chart;
        }
        //private Chart TopFiveEmpWithMinLeaveWithRespToProj()
        //{
        //    Chart chart = new Chart();

        //    try
        //    {

        //    }
        //    catch (Exception ex)
        //    {
        //        chart = new Chart();
        //    }

        //    return chart;

        //}
        //private Chart TopFiveEmpWithMaxLeaveWithRespToProj()
        //{
        //    Chart chart = new Chart();

        //    try
        //    {

        //    }
        //    catch (Exception ex)
        //    {
        //        chart = new Chart();
        //    }

        //    return chart;

        //}
        private Chart TopFiveEmpWithMaxSkills()
        {
            Chart chart = new Chart();

            try
            {
                chart.Labels = new List<string>();
                chart.Data = new List<object>();
                var empSkils = (from empSk in _unitOfWork.Context.EmployeeSkill
                               group empSk by empSk.EmployeeId into id
                               select new {id.Key, count = id.Count() }).OrderByDescending(x =>x.count).Take(5).ToList();
                foreach(var emp in empSkils)
                {
                    var em = _unitOfWork.Context.Employee.Where(e => e.EmployeeId == emp.Key).FirstOrDefault();
                    var name = em.EmployeeFirstname.Trim() + " " + em.EmployeeLastname.Trim();
                    chart.Labels.Add(name + "( " + emp.Key + " )");
                    chart.Data.Add(emp.count);
                }
            }
            catch (Exception ex)
            {
                chart = new Chart();
            }

            return chart;

        }
        private Chart TopFiveEmpWithMinSkills()
        {
            Chart chart = new Chart();

            try
            {
                chart.Labels = new List<string>();
                chart.Data = new List<object>();
                var empSkils = (from empSk in _unitOfWork.Context.EmployeeSkill
                                group empSk by empSk.EmployeeId into id
                                select new { id.Key, count = id.Count() }).OrderBy(x => x.count).Take(5).ToList();
                foreach (var emp in empSkils)
                {
                    var em = _unitOfWork.Context.Employee.Where(e => e.EmployeeId == emp.Key).FirstOrDefault();
                    var name = em.EmployeeFirstname.Trim() + " " + em.EmployeeLastname.Trim();
                    chart.Labels.Add(name + "( " + emp.Key + " )");
                    chart.Data.Add(emp.count);
                }

            }
            catch (Exception ex)
            {
                chart = new Chart();
            }

            return chart;

        }
        private Chart NumOfEmpWorkingInEachJobLoc()
        {
            Chart chart = new Chart();

            try
            {
                chart.Labels = new List<string>();
                chart.Data = new List<object>();
                var emps = (from emp in _unitOfWork.Context.Employee
                                group emp by emp.JobLocationId into id
                                select new { id.Key, count = id.Count()}).ToList();
                foreach(var emp in emps)
                {
                    var cityId = _unitOfWork.Context.JobLocation.Where(l => l.JobLocationId == emp.Key).FirstOrDefault().CityId;
                    var cityName = _unitOfWork.Context.City.Where(c => c.CityId == cityId).FirstOrDefault().CityName;
                    chart.Labels.Add(cityName);
                    chart.Data.Add(emp.count);
                }
            }
            catch (Exception ex)
            {
                chart = new Chart();
            }

            return chart;

        }
        private Chart NumOfEmpWorkingInEachDept()
        {
            Chart chart = new Chart();

            try
            {
                chart.Labels = new List<string>();
                chart.Data = new List<object>();
                var emps = (from emp in _unitOfWork.Context.Employee
                            group emp by emp.DepartmentId into id
                            select new { id.Key, count = id.Count() }).ToList();
                foreach (var emp in emps)
                {
                    var name = _unitOfWork.Context.Department.Where(l => l.DepartmentId == emp.Key).FirstOrDefault().DepartmentName;
                    chart.Labels.Add(name);
                    chart.Data.Add(emp.count);
                }
            }
            catch (Exception ex)
            {
                chart = new Chart();
            }

            return chart;

        }
    }

}

