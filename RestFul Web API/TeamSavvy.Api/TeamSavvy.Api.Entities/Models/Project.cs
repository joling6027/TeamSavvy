using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace TeamSavvy.Api.Entities.Models
{
    public partial class Project
    {
        public Project()
        {
            EmployeeProject = new HashSet<EmployeeProject>();
            Task = new HashSet<Task>();
        }

        public int ProjectId { get; set; }
        public string ProjectName { get; set; }
        public DateTime ProjectStartDate { get; set; }
        public DateTime? ProjectEndDate { get; set; }
        public string ProjectBudget { get; set; }
        public string ProjectDesc { get; set; }
        public int? TotalTaskCount { get; set; }
        public int? TotalCompletedCount { get; set; }
        public int ProjectManagerId { get; set; }
        public string ProjectManagerName { get; set; }
        public string ProjectClient { get; set; }
        public string ProjectLead { get; set; }
        public int? ProjectTotalEmployees { get; set; }

        public virtual ICollection<EmployeeProject> EmployeeProject { get; set; }
        public virtual ICollection<Task> Task { get; set; }
    }
}
