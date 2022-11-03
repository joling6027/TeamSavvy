using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace TeamSavvy.Api.Entities.Models
{
    public partial class Employee
    {
        public Employee()
        {
            Dashboard = new HashSet<Dashboard>();
            EmployeeProject = new HashSet<EmployeeProject>();
            JobApplied = new HashSet<JobApplied>();
            Payroll = new HashSet<Payroll>();
            Salary = new HashSet<Salary>();
            Task = new HashSet<Task>();
            TimeSheet = new HashSet<TimeSheet>();
        }

        public int EmployeeId { get; set; }
        public string EmployeeFirstname { get; set; }
        public string EmployeeLastname { get; set; }
        public string Dateofbirth { get; set; }
        public string Hiredate { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public int AddressId { get; set; }
        public int Extension { get; set; }
        public int DepartmentId { get; set; }
        public int RoleId { get; set; }
        public int StatusId { get; set; }
        public string Bankaccount { get; set; }
        public int JobLocationId { get; set; }
        public byte[] EmployeeImage { get; set; }
        public string Password { get; set; }
        public string Bankname { get; set; }
        public string Bankcode { get; set; }

        public virtual JobLocation JobLocation { get; set; }
        public virtual Role Role { get; set; }
        public virtual Status Status { get; set; }
        public virtual ICollection<Dashboard> Dashboard { get; set; }
        public virtual ICollection<EmployeeProject> EmployeeProject { get; set; }
        public virtual ICollection<JobApplied> JobApplied { get; set; }
        public virtual ICollection<Payroll> Payroll { get; set; }
        public virtual ICollection<Salary> Salary { get; set; }
        public virtual ICollection<Task> Task { get; set; }
        public virtual ICollection<TimeSheet> TimeSheet { get; set; }
    }
}
