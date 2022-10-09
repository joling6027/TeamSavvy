using System;
using System.Collections.Generic;
using System.Text;

namespace TeamSavvy.Api.BusinessModel.DataTransferModel
{
    public class JobLocationDto
    {
        public int JobLocationId { get; set; }
        public string JobLocationName { get; set; }
        public int JobLocationAddressId { get; set; }
    }
}
