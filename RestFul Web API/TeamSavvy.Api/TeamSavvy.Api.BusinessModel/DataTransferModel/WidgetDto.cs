using System;
using System.Collections.Generic;
using System.Text;

namespace TeamSavvy.Api.BusinessModel.DataTransferModel
{
    public class WidgetDto
    {
        public int WidgetId { get; set; }
        public int DashboardId { get; set; }
        public string WidgetName { get; set; }
        public int WidgetTypeId { get; set; }
        public string XAxis { get; set; }
        public string YAxis { get; set; }
        public int Height { get; set; }
        public int Length { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
