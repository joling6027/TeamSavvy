using System;
using System.Collections.Generic;
using System.Text;

namespace TeamSavvy.Api.BusinessModel.DataTransferModel
{
    public class ProjectDto
    {
        public int ProjectId { get; set; }
        public int EmployeeId { get; set; }
        public int EmployeeProjectId { get; set; }
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
        public bool EmployeeProjectStatus { get; set; }

    }
}
