using System;
using System.Collections.Generic;
using System.Text;

namespace TeamSavvy.Api.BusinessModel.DataTransferModel
{
    public class TimeSheetDto
    {
        public int TimesheetId { get; set; }
        public int EmployeeId { get; set; }
        public string ClockDate { get; set; }
        public string ClockTime { get; set; }
        public string ClockType { get; set; }

    }
}
