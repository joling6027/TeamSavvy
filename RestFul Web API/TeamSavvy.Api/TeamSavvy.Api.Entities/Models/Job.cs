using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace TeamSavvy.Api.Web.Models
{
    public partial class Job
    {
        public Job()
        {
            JobApplied = new HashSet<JobApplied>();
        }

        public int JobId { get; set; }
        public int JobCategoryId { get; set; }
        public int JobLocationId { get; set; }
        public int DepartmentId { get; set; }
        public string JobPosition { get; set; }
        public int JobSalary { get; set; }
        public string JobDesc { get; set; }
        public string Qualification { get; set; }
        public DateTime CreatedOn { get; set; }

        public virtual JobCategory JobCategory { get; set; }
        public virtual JobLocation JobLocation { get; set; }
        public virtual ICollection<JobApplied> JobApplied { get; set; }
    }
}
