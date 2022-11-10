using System;
using System.Collections.Generic;
using System.Text;

namespace TeamSavvy.Api.BusinessModel.DataTransferModel.Charts
{
    public class Chart
    {
        public List<string> Labels { get; set; }
        public List<int> Data { get; set; }
    }
}
