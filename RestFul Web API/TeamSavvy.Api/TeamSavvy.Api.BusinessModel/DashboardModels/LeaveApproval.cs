using System;
using System.Collections.Generic;
using System.Text;

namespace TeamSavvy.Api.BusinessModel.DashboardModels
{
    public class LeaveApproval
    {
        //employeeId
        public int Id { get; set; }
        public string LeaveStartDate { get; set; }
        public string LeaveEndDate { get; set; }
        public string  ProjectName { get; set; }
        public int? TotalLeaveDays { get; set; }
    }
}
