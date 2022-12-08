using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace TeamSavvy.Api.Entities.Models
{
    public partial class JobLocation
    {
        public JobLocation()
        {
            Employee = new HashSet<Employee>();
        }

        public int JobLocationId { get; set; }
        public string Location { get; set; }
        public string Postcode { get; set; }
        public int CityId { get; set; }

        public virtual City City { get; set; }
        public virtual ICollection<Employee> Employee { get; set; }
    }
}
