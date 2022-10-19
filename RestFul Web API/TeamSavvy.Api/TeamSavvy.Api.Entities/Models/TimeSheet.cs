using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace TeamSavvy.Api.Entities.Models
{
    public partial class TimeSheet
    {
        public int TimesheetId { get; set; }
        public int EmployeeId { get; set; }
        public string ClockDate { get; set; }
        public string ClockTime { get; set; }
        public string ClockType { get; set; }

        public virtual Employee Employee { get; set; }
    }
}
