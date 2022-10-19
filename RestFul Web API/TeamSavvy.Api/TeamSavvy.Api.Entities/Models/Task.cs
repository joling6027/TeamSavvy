using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace TeamSavvy.Api.Entities.Models
{
    public partial class Task
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

        public virtual Employee Employee { get; set; }
        public virtual Project Project { get; set; }
    }
}
