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
        public int TotalHours { get; set; }
        public decimal Earning { get; set; }
        public decimal Netpay { get; set; }
        public decimal PayYtd { get; set; }
        public decimal PayVacation { get; set; }
        public decimal PaySick { get; set; }
        public decimal Deduction { get; set; } 
    }
}
