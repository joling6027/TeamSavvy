using System;
using System.Collections.Generic;
using System.Text;

namespace TeamSavvy.Api.BusinessModel.DataTransferModel
{
    public class JobLocationDto
    {
        public int JobLocationId { get; set; }
        public string Location { get; set; }
        public string Postcode { get; set; }
        //public int CityId { get; set; }
        public CityDto City { get; set; }
    }
}
