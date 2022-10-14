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
        public List<EmployeeSkillReadDto> Skills { get; set; }
    }

    public class EmployeeAddDto
    {
        public int EmployeeId { get; set; }
        public string EmployeeFirstname { get; set; }
        public string EmployeeLastname { get; set; }
        public DateTime Dateofbirth { get; set; }
        public DateTime? Hiredate { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public AddressAddDto Address { get; set; }
        public EmployeeSkillDto EmployeeSkill { get; set; }
        public int Extension { get; set; }
        public int DepartmentId { get; set; }
        public int RoleId { get; set; }
        public int StatusId { get; set; }
        public string Bankaccount { get; set; }
        public int JobLocationId { get; set; }
        public string Password { get; set; }

    }
}
