using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace TeamSavvy.Api.Entities.Models
{
    public partial class EmployeeLeave
    {
        public int EmployeeLeaveId { get; set; }
        public int EmployeeId { get; set; }
        public int LeaveTypeId { get; set; }
        public DateTime LeaveStart { get; set; }
        public DateTime LeaveEnds { get; set; }
        public int? LeaveDays { get; set; }
        public bool IsApproved { get; set; }
        public DateTime? LeaveApprovalDate { get; set; }
        public string LeaveApprovalBy { get; set; }
        public string LeaveStatus { get; set; }
    }
}
