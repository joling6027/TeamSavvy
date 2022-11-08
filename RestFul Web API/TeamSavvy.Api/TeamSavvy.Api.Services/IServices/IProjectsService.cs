using System;
using System.Collections.Generic;
using System.Text;
using TeamSavvy.Api.BusinessModel.DataTransferModel;

namespace TeamSavvy.Api.Services.IServices
{
    public interface IProjectsService
    {
        ProjectDto GetProjectById(int id);
        ProjectDto GetProjectByName(string projectName);
        List<ProjectDto> GetProjects();
        List<ProjectDto> GetProjectsByEmployeeId(int employeeId);
        bool AddProject(ProjectDto project);
        bool UpdateProject(ProjectDto project);
        bool DeleteProject(int id);

    }
}
