using System;
using System.Collections.Generic;
using System.Text;

namespace TeamSavvy.Api.BusinessModel.DashboardModels
{
    public class Project
    {
        public int ProjectId { get; set; }
        public string  ProjectName { get; set; }
        public int TotalTasks { get; set; }
        public int TotalTeamMember { get; set; }
        public string ProjectBudget { get; set; }
        public string ProjectDesc { get; set; }
    }
}
