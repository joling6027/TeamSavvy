using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace TeamSavvy.Api.Entities.Models
{
    public partial class Job
    {
        public Job()
        {
            JobApplied = new HashSet<JobApplied>();
            JobSkills = new HashSet<JobSkills>();
        }

        public int JobId { get; set; }
        public string JobPosition { get; set; }
        public string Salary { get; set; }
        public string Details { get; set; }
        public string Responsibilities { get; set; }
        public string CreatedOn { get; set; }
        public string Deadline { get; set; }
        public bool Isdelete { get; set; }

        public virtual ICollection<JobApplied> JobApplied { get; set; }
        public virtual ICollection<JobSkills> JobSkills { get; set; }
    }
}
