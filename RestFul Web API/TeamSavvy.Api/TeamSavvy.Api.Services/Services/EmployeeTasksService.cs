﻿using AutoMapper;
using Org.BouncyCastle.Math.EC.Rfc7748;
using System;
using System.Collections.Generic;
using System.Linq;
using TeamSavvy.Api.BusinessModel.DataTransferModel;
using TeamSavvy.Api.Entities.Context;
using TeamSavvy.Api.Entities.GenericRepo;
using TeamSavvy.Api.Entities.Models;
using TeamSavvy.Api.Services.IServices;
using Task = TeamSavvy.Api.Entities.Models.Task;

namespace TeamSavvy.Api.Services.Services
{
    public class EmployeeTasksService : IEmployeeTasksService
    {
        #region Private Member Variables
        /// <summary>
        /// Initialise generic data context variable.
        /// </summary>
        private readonly GenericUnitOfWork<TeamSavvyContext> _unitOfWork;
        private readonly IMapper _mapper;
        #endregion

        #region constructor
        public EmployeeTasksService(GenericUnitOfWork<TeamSavvyContext> unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        #endregion
        public bool AddTask(TaskDto task)
        {
            bool isSuccess = false;
            try
            {
                if (task != null)
                {
                    var addTask = _mapper.Map<Task>(task);
                    _unitOfWork.Repository<Task>().Insert(addTask);
                    _unitOfWork.SaveChanges();
                    if (addTask.TaskId > 0)
                    {

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

        public bool AddTasks(List<TaskDto> tasks)
        {
            bool isSuccess = false;
            try
            {
                if (tasks != null && tasks.Any())
                {
                    var addTasks = _mapper.Map<List<Task>>(tasks);
                    _unitOfWork.Repository<List<Task>>().Insert(addTasks);
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

        public bool DeleteTask(int taskId)
        {

            bool isSuccess = false;
            try
            {
                if (taskId > 0)
                {
                    var project = _unitOfWork.Context.Task.Where(x => x.TaskId == taskId).FirstOrDefault();
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

        public TaskDto GetTaskById(int taskId)
        {
            TaskDto task = null;
            try
            {
                var res = _unitOfWork.Context.Task.Where(x => x.TaskId == taskId).FirstOrDefault();
                if (res != null)
                {
                    task = _mapper.Map<TaskDto>(res);
                }

            }
            catch (Exception e)
            {
                task = null;
            }
            return task;
        }

        public List<TaskDto> GetTaskByManagerId(int managerId)
        {
            List<TaskDto> task = null;
            try
            {
                var projectIds = _unitOfWork.Context.EmployeeProject.Where(e => e.EmployeeId == managerId && e.Status == true).Select(p => p.ProjectId).ToList();
                List<Task> tasks = new List<Task>();
                foreach (var projId in projectIds)
                {
                    var taskRes = _unitOfWork.Context.Task.Where(x => x.ProjectId == projId).ToList();
                    if (taskRes.Any())
                    {
                        tasks.AddRange(taskRes);
                    }
                  
                }
               
                if (tasks.Any())
                {
                    task = _mapper.Map<List<TaskDto>>(tasks);
                }

            }
            catch (Exception e)
            {
                task = null;
            }
            return task;
        }

        public TaskDto GetTaskByName(string taskName)
        {
            TaskDto task = null;
            try
            {
                var res = _unitOfWork.Context.Task.Where(x => x.TaskName == taskName).FirstOrDefault();
                if (res != null)
                {
                    task = _mapper.Map<TaskDto>(res);
                }

            }
            catch (Exception e)
            {
                task = null;
            }
            return task;
        }

        public List<TaskDto> GetTasks()
        {
            List<TaskDto> task = null;
            try
            {
                var res = _unitOfWork.Context.Task.ToList();
                if (res != null)
                {
                    task = _mapper.Map<List<TaskDto>>(res);
                }

            }
            catch (Exception e)
            {
                task = null;
            }
            return task;
        }

        public List<TaskDto> GetTasksByEmployeeId(int employeeId)
        {
            List<TaskDto> task = null;
            try
            {
              var res = _unitOfWork.Context.Task
                      .Where(x => x.EmployeeId == employeeId)
                      .Join(_unitOfWork.Context.EmployeeProject,
                       task => task.ProjectId,
                       empProj => empProj.ProjectId,
                       (task, empProj) => new { Tsk = task, EmpPrj = empProj })
                      .Where(x => x.EmpPrj.EmployeeId == employeeId && x.EmpPrj.Status == true)
                      .Select( s => s.Tsk)
                      .ToList();
                if (res != null)
                {
                    task = _mapper.Map<List<TaskDto>>(res);
                }

            }
            catch (Exception e)
            {
                task = null;
            }
            return task;
        }

        public List<TaskDto> GetTasksByEmployeeIdAndProjId(int employeeId, int projId)
        {
            List<TaskDto> task = null;
            try
            {
                var res = _unitOfWork.Context.Task
                        .Where(x => x.EmployeeId == employeeId)
                        .Join(_unitOfWork.Context.EmployeeProject,
                         task => task.ProjectId,
                         empProj => empProj.ProjectId,
                         (task, empProj) => new { Tsk = task, EmpPrj = empProj })
                        .Where(x => x.EmpPrj.EmployeeId == employeeId && x.EmpPrj.ProjectId == projId && x.EmpPrj.Status == true)
                        .Select(s => s.Tsk)
                        .ToList();
                if (res != null)
                {
                    task = _mapper.Map<List<TaskDto>>(res);
                }

            }
            catch (Exception e)
            {
                task = null;
            }
            return task;
        }


        public bool UpdateTask(TaskDto task)
        {
            bool isSuccess = false;
            try
            {
                if (task != null)
                {
                    var updateTask = _mapper.Map<Task>(task);
                    _unitOfWork.Repository<Task>().Update(updateTask);
                    _unitOfWork.SaveChanges();
                    isSuccess = true;
                }
            }
            catch(Exception e)
            {
                isSuccess = false;
            }
            return isSuccess;
        }
    }
}
