using System;
using System.Collections.Generic;
using System.Text;

namespace TeamSavvy.Api.BusinessModel.DataTransferModel
{
    public class SalaryDto
    {
        public int SalaryId { get; set; }
        public string Employeesalary { get; set; }
        public int EmployeeId { get; set; }
        public string SalaryIncrementDate { get; set; }
        public string SalaryType { get; set; }

    }
}
