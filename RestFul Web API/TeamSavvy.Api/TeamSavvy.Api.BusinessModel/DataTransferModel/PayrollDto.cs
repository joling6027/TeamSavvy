using System;
using System.Collections.Generic;
using System.Text;

namespace TeamSavvy.Api.BusinessModel.DataTransferModel
{
    public class PayrollDto
    {
        public int PayrollId { get; set; }
        public int EmployeeId { get; set; }
        public DateTime PayDate { get; set; }
        public string PayType { get; set; }
        public int? TotalHours { get; set; }
        public string Earning { get; set; }
        public string Netpay { get; set; }
        public string PayYtd { get; set; }
        public string PayVacation { get; set; }
        public string PaySick { get; set; }
        public string Deduction { get; set; }
        public int SalaryId { get; set; }
    }
}
