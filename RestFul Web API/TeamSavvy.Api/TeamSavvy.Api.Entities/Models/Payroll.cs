using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace TeamSavvy.Api.Entities.Models
{
    public partial class Payroll
    {
        public int PayrollId { get; set; }
        public int EmployeeId { get; set; }
        public int SalaryId { get; set; }
        public DateTime PayDate { get; set; }
        public string PayType { get; set; }
        public int? TotalHours { get; set; }
        public string Earning { get; set; }
        public string Netpay { get; set; }
        public string PayYtd { get; set; }
        public string PayVacation { get; set; }
        public string PaySick { get; set; }
        public string Deduction { get; set; }

        public virtual Employee Employee { get; set; }
        public virtual Salary Salary { get; set; }
    }
}
