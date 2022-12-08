using System;
using System.Collections.Generic;
using System.Text;

namespace TeamSavvy.Api.BusinessModel.DataTransferModel
{
    public class StatusDto
    {
        public int StatusId { get; set; }
        public string StatusType { get; set; }

        public static implicit operator StatusDto(int v)
        {
            throw new NotImplementedException();
        }
    }
}
