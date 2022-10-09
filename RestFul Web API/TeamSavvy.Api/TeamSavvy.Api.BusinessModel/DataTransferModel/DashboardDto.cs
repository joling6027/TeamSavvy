using System;
using System.Collections.Generic;
using System.Text;

namespace TeamSavvy.Api.BusinessModel.DataTransferModel
{
    public class DashboardDto
    {
        public int DashboardId { get; set; }
        public int EmployeeId { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public byte IsDeleted { get; set; }
        public int CreatedById { get; set; }

    }
}
