using System;
using System.Collections.Generic;
using System.Text;
using TeamSavvy.Api.BusinessModel.DashboardModels;

namespace TeamSavvy.Api.Services.IServices
{
    public interface IDashboardService
    {
        List<TeamMembers> GetTeamMembers(int managerId);
        int GetTeamMembersCount(int managerId);
        List<Project> GetProjects(int managerId);
        List<Project> GetProjects();
        TaskCount GetTaskCount(int projectId);
    }
}
