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
        public string Dateofbirth { get; set; }
        public string Hiredate { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public int Extension { get; set; }
        //public int DepartmentId { get; set; }
        //public int RoleId { get; set; }
        //public int StatusId { get; set; }
        public string Bankaccount { get; set; }
        public byte[] EmployeeImage { get; set; }
        public string Password { get; set; }
        public string Bankname { get; set; }
        public string Bankcode { get; set; }
        public StatusDto Status { get; set; }
        public RoleDto Role { get; set; }
        public DepartmentDto Department { get; set; }
        public JobLocationDto JobLocation { get; set; }
        public AddressDto Address { get; set; }
        public List<EmployeeSkillDto> Skills { get; set; }
    }

}
