using System;
using System.Collections.Generic;
using System.Text;
using TeamSavvy.Api.BusinessModel.DataTransferModel;

namespace TeamSavvy.Api.Services.IServices
{
    public interface ISalaryService
    {
        SalaryDto GetSalaryBySalaryId(int salaryId);
        SalaryDto GetSalaryByEmployeeId(int employeeId);
        bool AddSalary(SalaryDto salary);
        bool DeleteSalary(int id);
    }
}
