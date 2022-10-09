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
        public DateTime LeaveStart { get; set; }
        public DateTime LeaveEnds { get; set; }
        public int LeaveDays { get; set; }
        public byte IsApproved { get; set; }
        public DateTime LeaveApprovalDate { get; set; }
        public int LeaveApprovalBy { get; set; }
        public string LeaveStatus { get; set; }
    }
}
