using System;
using System.Collections.Generic;
using System.Text;
using TeamSavvy.Api.BusinessModel.DataTransferModel;

namespace TeamSavvy.Api.Services.IServices
{
    public interface IEmployeeService
    {
        EmployeeDto GetEmployeeById(int id);
        List<EmployeeDto> GetAllEmployees();
        //List<EmployeeDto> GetEmployeeByFirstName(string name);
        bool AddEmployee(EmployeeDto employee);
        bool UpdateEmployee(EmployeeDto employee);
        bool DeleteEmployee(int id, string status);
    }
}
