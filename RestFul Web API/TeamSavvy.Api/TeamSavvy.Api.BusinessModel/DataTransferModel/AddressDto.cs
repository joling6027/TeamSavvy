using System;
using System.Collections.Generic;
using System.Text;

namespace TeamSavvy.Api.BusinessModel.DataTransferModel
{
    public class AddressDto
    {

        public int AddressId { get; set; }
        public string Apartment { get; set; }
        //public int CityId { get; set; }
        public string Postcode { get; set; }
        public CityDto City { get; set; }

    }
}
