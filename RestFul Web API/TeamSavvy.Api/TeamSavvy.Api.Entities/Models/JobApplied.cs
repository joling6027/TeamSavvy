using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace TeamSavvy.Api.Entities.Models
{
    public partial class JobApplied
    {
        public int JobAppliedId { get; set; }
        public int EmployeeId { get; set; }
        public int JobId { get; set; }
        public DateTime AppliedOn { get; set; }

        public virtual Employee Employee { get; set; }
        public virtual Job Job { get; set; }
    }
}
