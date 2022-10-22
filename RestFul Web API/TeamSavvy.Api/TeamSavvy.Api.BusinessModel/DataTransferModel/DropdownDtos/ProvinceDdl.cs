using System;
using System.Collections.Generic;
using System.Text;

namespace TeamSavvy.Api.BusinessModel.DataTransferModel.DropdownDtos
{
    public class ProvinceDdl
    {
        public int ProvinceId { get; set; }
        public string ProvinceName { get; set; }
        public string ProvinceAbbr { get; set; }

        public List<CityDdl> Cities { get; set; }
    }
}
