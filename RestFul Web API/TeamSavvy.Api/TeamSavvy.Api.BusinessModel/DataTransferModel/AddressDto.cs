using System;
using System.Collections.Generic;
using System.Text;

namespace TeamSavvy.Api.BusinessModel.DataTransferModel
{
    public class AddressDto
    {
        public string Apartment { get; set; }
        public CityDto City { get; set; }
        public string Postcode { get; set; }
    }
}
