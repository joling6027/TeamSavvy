﻿using System;
using System.Collections.Generic;
using System.Text;
using TeamSavvy.Api.BusinessModel.DataTransferModel;

namespace TeamSavvy.Api.Services.IServices
{
    public interface IEmployeeTask
    {
        TaskDto GetTaskById(int id);
        TaskDto GetTaskByName(string taskName);
        List<TaskDto> GetTasks();
        List<TaskDto> GetTasksByEmployeeId(int employeeId);
        bool AddTask(TaskDto task);
        bool AddTasks(List<TaskDto> tasks);
        bool UpdateTask(TaskDto task);
        bool DeleteTask(int id);
    }
}
