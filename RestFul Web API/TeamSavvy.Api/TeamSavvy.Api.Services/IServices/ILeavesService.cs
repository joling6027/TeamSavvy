using System;
using System.Collections.Generic;
using System.Text;
using TeamSavvy.Api.BusinessModel.DataTransferModel;

namespace TeamSavvy.Api.Services.IServices
{
    public interface ILeavesService
    {
        EmployeeLeaveDto GetLeaveById(int leaveId);
        List<EmployeeLeaveDto> GetLeavesByEmployeeId(int employeeId);
        bool AddLeave(EmployeeLeaveDto leave);
        bool UpdateLeave(EmployeeLeaveDto Leave);
        bool DeleteLeave(int leaveId);
    }
}
