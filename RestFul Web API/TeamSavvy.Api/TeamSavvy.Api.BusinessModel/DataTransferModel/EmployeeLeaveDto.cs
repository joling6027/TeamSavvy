using System;
using System.Collections.Generic;
using System.Text;

namespace TeamSavvy.Api.BusinessModel.DataTransferModel
{
    public class EmployeeLeaveDto
    {
        public int EmployeeLeaveId { get; set; }
        public int EmployeeId { get; set; }
        public int LeaveTypeId { get; set; }
        public string LeaveStart { get; set; }
        public string LeaveEnds { get; set; }
        public int? LeaveDays { get; set; }
        public bool IsApproved { get; set; }
        public string LeaveApprovalDate { get; set; }
        public string LeaveApprovalBy { get; set; }
        public string LeaveStatus { get; set; }
    }
}
