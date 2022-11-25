using System;
using System.Collections.Generic;
using System.Text;

namespace TeamSavvy.Api.BusinessModel.DashboardModels
{
    public class Project
    {
        public int Id { get; set; }
        public int ProjectManagerId { get; set; }
        public string  ProjectName { get; set; }
        public string ProjectManagerName { get; set; }
        public int Tasks { get; set; }
        public int Team { get; set; }
        public string Budget { get; set; }
        public string Description { get; set; }
    }
}
