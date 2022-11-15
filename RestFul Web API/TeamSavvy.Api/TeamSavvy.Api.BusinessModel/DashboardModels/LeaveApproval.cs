using System;
using System.Collections.Generic;
using System.Text;

namespace TeamSavvy.Api.BusinessModel.DashboardModels
{
    public class LeaveApproval
    {
        //employeeId
        public int EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public string Email { get; set; }
        public string Department { get; set; }
        public int Extension { get; set; }
        public string Role { get; set; }
        public string  EmployeeImage { get; set; }
        //EmployeeLeaveId
        public int Id { get; set; }
        public string LeaveType { get; set; }
        public string LeaveStartDate { get; set; }
        public string LeaveEndDate { get; set; }
        public string  ProjectName { get; set; }
        public int? TotalLeaveDays { get; set; }
    }
}
