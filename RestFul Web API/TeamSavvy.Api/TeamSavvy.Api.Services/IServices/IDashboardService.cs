using System;
using System.Collections.Generic;
using System.Text;
using TeamSavvy.Api.BusinessModel.DashboardModels;
using TeamSavvy.Api.BusinessModel.DataTransferModel;
using TeamSavvy.Api.BusinessModel.DataTransferModel.Charts;

namespace TeamSavvy.Api.Services.IServices
{
    public interface IDashboardService
    {
        List<TeamMembers> GetTeamMembers(int managerId);
        List<TeamMembers> GetTeamMembers();
        int GetTeamMembersCount(int managerId);
        List<Project> GetProjects(int managerId);
        List<Project> GetProjects();
        TaskCount GetTaskCount(int projectId);
        Chart GetTopFiveProjects();
        List<LeaveApproval> GetEmployeesLeavesByManagerId(int managerId);
        List<LeaveApproval> GetEmployeesLeaves();
        int GetDashBoardId(int employeeId);
        List<DashboardWidget> GetWidegts(int employeeId);
        bool AddWidget(WidgetDto widget);
        bool DeleteWidget(int widgetId);    
    }
}
