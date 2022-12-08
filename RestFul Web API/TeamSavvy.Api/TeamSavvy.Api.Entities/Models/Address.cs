using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace TeamSavvy.Api.Entities.Models
{
    public partial class Address
    {
        public int AddressId { get; set; }
        public string Apartment { get; set; }
        public int CityId { get; set; }
        public string Postcode { get; set; }

        public virtual City City { get; set; }
    }
}
