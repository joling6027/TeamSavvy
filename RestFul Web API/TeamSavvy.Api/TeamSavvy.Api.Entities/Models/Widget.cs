using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace TeamSavvy.Api.Entities.Models
{
    public partial class Widget
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

        public virtual Dashboard Dashboard { get; set; }
    }
}
