using System;
using System.Collections.Generic;
using System.Text;

namespace TeamSavvy.Api.BusinessModel.DataTransferModel
{
    public class EmployeeDto
    {
        public int EmployeeId { get; set; }
        public string EmployeeFirstname { get; set; }
        public string EmployeeLastname { get; set; }
        public DateTime Dateofbirth { get; set; }
        public DateTime? Hiredate { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public AddressDto Address { get; set; }
        public int Extension { get; set; }
        public DepartmentDto Department { get; set; }
        public string Role { get; set; }
        public StatusDto Status { get; set; }
        public string Bankaccount { get; set; }
        public JobLocationDto JobLocation { get; set; }
    }
}
