using System;
using System.Collections.Generic;
using System.Text;

namespace TeamSavvy.Api.BusinessModel.DashboardModels
{
    public class TaskCount
    {
        public int TotalTasks { get; set; }
        public int InProgress { get; set; }
        public int Completed { get; set; }
    }
}
