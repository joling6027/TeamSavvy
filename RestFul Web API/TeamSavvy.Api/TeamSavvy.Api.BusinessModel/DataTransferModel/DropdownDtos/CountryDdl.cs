using System;
using System.Collections.Generic;
using System.Text;

namespace TeamSavvy.Api.BusinessModel.DataTransferModel.DropdownDtos
{
    public class CountryDdl
    {
        public int CountryId { get; set; }
        public string CountryName { get; set; }
        public List<ProvinceDdl> Provinces { get; set; }
    }
}
