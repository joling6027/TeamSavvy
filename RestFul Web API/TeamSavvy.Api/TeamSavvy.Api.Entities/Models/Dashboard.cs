using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace TeamSavvy.Api.Entities.Models
{
    public partial class Dashboard
    {
        public Dashboard()
        {
            Widget = new HashSet<Widget>();
        }

        public int DashboardId { get; set; }
        public int EmployeeId { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public byte IsDeleted { get; set; }
        public int CreatedById { get; set; }

        public virtual Employee Employee { get; set; }
        public virtual ICollection<Widget> Widget { get; set; }
    }
}
