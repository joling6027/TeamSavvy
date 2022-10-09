using System;
using System.Collections.Generic;
using System.Text;

namespace TeamSavvy.Api.BusinessModel.DataTransferModel
{
    public class JobDto
    {
        public int JobId { get; set; }
        public int JobCategoryId { get; set; }
        public int JobLocationId { get; set; }
        public int DepartmentId { get; set; }
        public string JobPosition { get; set; }
        public decimal JobSalary { get; set; }
        public string JobDesc { get; set; }
        public string Qualification { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
