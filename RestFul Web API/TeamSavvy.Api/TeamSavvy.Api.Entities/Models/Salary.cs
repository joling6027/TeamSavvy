using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace TeamSavvy.Api.Entities.Models
{
    public partial class Salary
    {
        public Salary()
        {
            Payroll = new HashSet<Payroll>();
        }

        public int SalaryId { get; set; }
        public string Employeesalary { get; set; }
        public int EmployeeId { get; set; }
        public string SalaryIncrementDate { get; set; }
        public string SalaryType { get; set; }

        public virtual Employee Employee { get; set; }
        public virtual ICollection<Payroll> Payroll { get; set; }
    }
}
