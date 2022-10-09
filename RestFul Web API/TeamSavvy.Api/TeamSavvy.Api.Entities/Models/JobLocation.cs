using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace TeamSavvy.Api.Web.Models
{
    public partial class JobLocation
    {
        public JobLocation()
        {
            Employee = new HashSet<Employee>();
            Job = new HashSet<Job>();
        }

        public int JobLocationId { get; set; }
        public string JobLocationName { get; set; }
        public int JobLocationAddressId { get; set; }

        public virtual Address JobLocationAddress { get; set; }
        public virtual ICollection<Employee> Employee { get; set; }
        public virtual ICollection<Job> Job { get; set; }
    }
}
