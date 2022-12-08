using System;
using System.Collections.Generic;
using System.Text;

namespace TeamSavvy.Api.BusinessModel.DataTransferModel
{
    public class CityDto
    {
        public int CityId { get; set; }
        public string CityName { get; set; }
        public ProvinceDto Province { get; set; }
   
    }
}
