using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace TeamSavvy.Api.Entities.Models
{
    public partial class Status
    {
        public Status()
        {
            Employee = new HashSet<Employee>();
        }

        public int StatusId { get; set; }
        public string StatusType { get; set; }

        public virtual ICollection<Employee> Employee { get; set; }
    }
}
