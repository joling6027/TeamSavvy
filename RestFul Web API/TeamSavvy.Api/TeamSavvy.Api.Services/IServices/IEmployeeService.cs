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
        List<EmployeeDto> GetEmployeeByFirstName(string name);
        bool AddEmployee(EmployeeAddDto employee);
        bool UpdateEmployee(EmployeeAddDto employee);
        bool DeleteEmployee(int id, string status);
    }
}
