using System;
using System.Collections.Generic;
using System.Text;

namespace TeamSavvy.Api.BusinessModel.DataTransferModel
{
    public class ProvinceDto
    {
        public int ProvinceId { get; set; }
        public string ProvinceName { get; set; }
        public string ProvinceAbbr { get; set; }
        public CountryDto Country { get; set; }
    }
}
