using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace TeamSavvy.Api.Web.Models
{
    public partial class JobCategory
    {
        public JobCategory()
        {
            Job = new HashSet<Job>();
        }

        public int JobCategoryId { get; set; }
        public string JobCategoryName { get; set; }
        public string JobCategoryValue { get; set; }

        public virtual ICollection<Job> Job { get; set; }
    }
}
