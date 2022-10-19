using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace TeamSavvy.Api.Entities.Models
{
    public partial class Province
    {
        public Province()
        {
            City = new HashSet<City>();
        }

        public int ProvinceId { get; set; }
        public string ProvinceName { get; set; }
        public string ProvinceAbbr { get; set; }
        public int CountryId { get; set; }

        public virtual Country Country { get; set; }
        public virtual ICollection<City> City { get; set; }
    }
}
