using System;
using System.Collections.Generic;
using System.Text;
using TeamSavvy.Api.BusinessModel.DataTransferModel;

namespace TeamSavvy.Api.Services.IServices
{
    public interface IPayRollService
    {
        PayrollDto GetPayrollById(int payrollId);
        List<PayrollDto> GetPayrolls();
        PayrollDto GetPayrollByEmployeeId(int employeeId);
        List<PayrollDto> GetPayrollsByEmployeeId(int employeeId);
        bool AddPayroll(PayrollDto payroll);
        bool UpdatePayroll(PayrollDto payroll);
        bool DeletePayroll(int id);
    }
}
