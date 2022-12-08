using System;
using System.Collections.Generic;
using System.Text;
using TeamSavvy.Api.BusinessModel.DataTransferModel.Charts;

namespace TeamSavvy.Api.BusinessModel.DashboardModels
{
    public class DashboardWidget
    {
        public int WidgetId { get; set; }
        public int DashboardId { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedOn { get; set; }
        public string Selection { get; set; }
        public string Queries { get; set; }
        public Chart Chart { get; set; }
    }
}
