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
        public string CreatedBy { get; set; }
        public string CreatedOn { get; set; }
        public string Selection { get; set; }
        public string Queries { get; set; }

        public virtual Dashboard Dashboard { get; set; }
    }
}
