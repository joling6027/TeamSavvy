using System;
using System.Collections.Generic;
using System.Net.NetworkInformation;
using System.Text;

namespace TeamSavvy.Api.BusinessModel.DashboardModels
{
    public class TeamMembers
    {
        public int ProjectId { get; set; }
        public string ProjectName { get; set; }
        public List<ProjectEmployee> EmployeeList { get; set; }
    }

    public class ProjectEmployee
    {
        public int Id { get; set; }
        public string EmployeeName { get; set; }
        public string Department { get; set; }
        public string Status { get; set; }
        public string Position { get; set; }
        public string Salary { get; set; }
        public int Progress { get; set; }
    }

    public class Employees
    {
        public int Id { get; set; }
        public string EmployeeName { get; set; }
        public string Department { get; set; }
        public string Status { get; set; }
        public string Position { get; set; }
        public string Salary { get; set; }
        public int Progress { get; set; }
    }
}
