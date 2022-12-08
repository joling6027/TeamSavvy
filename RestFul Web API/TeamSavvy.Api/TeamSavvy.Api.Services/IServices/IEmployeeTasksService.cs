using System;
using System.Collections.Generic;
using System.Text;
using TeamSavvy.Api.BusinessModel.DataTransferModel;

namespace TeamSavvy.Api.Services.IServices
{
    public interface IEmployeeTasksService
    {
        TaskDto GetTaskById(int taskId);
        TaskDto GetTaskByName(string taskName);
        List<TaskDto> GetTasks();
        List<TaskDto> GetTasksByEmployeeId(int employeeId);
        List<TaskDto> GetTasksByEmployeeIdAndProjId(int employeeId, int projId);

        List<TaskDto> GetTaskByManagerId(int managerId);
        bool AddTask(TaskDto task);
        bool AddTasks(List<TaskDto> tasks);
        bool UpdateTask(TaskDto task);
        bool DeleteTask(int id);
    }
}
