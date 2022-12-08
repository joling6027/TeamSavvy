using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace TeamSavvy.Api.Entities.Models
{
    public partial class City
    {
        public City()
        {
            Address = new HashSet<Address>();
            JobLocation = new HashSet<JobLocation>();
        }

        public int CityId { get; set; }
        public int ProvinceId { get; set; }
        public string CityName { get; set; }

        public virtual Province Province { get; set; }
        public virtual ICollection<Address> Address { get; set; }
        public virtual ICollection<JobLocation> JobLocation { get; set; }
    }
}
