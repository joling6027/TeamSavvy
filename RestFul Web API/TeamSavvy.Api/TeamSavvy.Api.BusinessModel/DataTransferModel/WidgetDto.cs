using System;
using System.Collections.Generic;
using System.Text;

namespace TeamSavvy.Api.BusinessModel.DataTransferModel
{
    public class WidgetDto
    {
        public int WidgetId { get; set; }
        public int DashboardId { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedOn { get; set; }
        public string Selection { get; set; }
        public string Queries { get; set; }
    }
}
