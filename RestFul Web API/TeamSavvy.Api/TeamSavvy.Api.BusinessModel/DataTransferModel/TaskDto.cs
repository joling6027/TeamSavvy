using System;
using System.Collections.Generic;
using System.Text;

namespace TeamSavvy.Api.BusinessModel.DataTransferModel
{
    public class TaskDto
    {
        public int TaskId { get; set; }
        public int EmployeeId { get; set; }
        public int ProjectId { get; set; }
        public string TaskName { get; set; }
        public string TaskDesc { get; set; }
        public DateTime? TaskStartDate { get; set; }
        public DateTime? TastEndDate { get; set; }
        public string TaskTotalHours { get; set; }
        public string AssignedBy { get; set; }
        public string AssignedTo { get; set; }
        public DateTime AssignedDate { get; set; }
        public string TaskStatus { get; set; }
    }
}
