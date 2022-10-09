using System;
using System.Collections.Generic;
using System.Text;
using TeamSavvy.Api.BusinessModel.DataTransferModel;

namespace TeamSavvy.Api.Services.IServices
{
    public interface ITimeSheetService
    {
        List<TimeSheetDto> GetTimeSheet(int employeeId);
        string GetTimeSheetMobile(int employeeId);
        bool AddAttendence(TimeSheetDto timeSheet);
    }
}
