using System;
using System.Collections.Generic;
using System.Text;

namespace TeamSavvy.Api.BusinessModel.DataTransferModel
{
    public class JobAppliedDto
    {
        public int JobAppliedId { get; set; }
        public int EmployeeId { get; set; }
        public int JobId { get; set; }
        public string AppliedOn { get; set; }
    }
}
