using System;
using System.Collections.Generic;
using System.Text;
using TeamSavvy.Api.BusinessModel.DataTransferModel;
using TeamSavvy.Api.Services.IServices;

namespace TeamSavvy.Api.Services.Services
{
    public class EmployeeTask : IEmployeeTask
    {
        public bool AddTask(TaskDto task)
        {
            throw new NotImplementedException();
        }

        public bool AddTasks(List<TaskDto> tasks)
        {
            throw new NotImplementedException();
        }

        public bool DeleteTask(int id)
        {
            throw new NotImplementedException();
        }

        public TaskDto GetTaskById(int id)
        {
            throw new NotImplementedException();
        }

        public TaskDto GetTaskByName(string taskName)
        {
            throw new NotImplementedException();
        }

        public List<TaskDto> GetTasks()
        {
            throw new NotImplementedException();
        }

        public List<TaskDto> GetTasksByEmployeeId(int employeeId)
        {
            throw new NotImplementedException();
        }

        public bool UpdateTask(TaskDto task)
        {
            throw new NotImplementedException();
        }
    }
}
