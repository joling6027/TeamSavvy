using System;
using System.Collections.Generic;
using System.Text;
using TeamSavvy.Api.BusinessModel.DataTransferModel;
using TeamSavvy.Api.BusinessModel.DataTransferModel.ChangePassword;

namespace TeamSavvy.Api.Services.IServices
{
    public interface IEmployeeService
    {
        EmployeeDto GetEmployeeById(int id);
        List<EmployeeDto> GetAllEmployees();
        bool ChangePassword(ChangePassword changePassword);
        int AddEmployee(EmployeeDto employee);
        bool UpdateEmployee(EmployeeDto employee);
        bool DeleteEmployee(int id);
    }
}
