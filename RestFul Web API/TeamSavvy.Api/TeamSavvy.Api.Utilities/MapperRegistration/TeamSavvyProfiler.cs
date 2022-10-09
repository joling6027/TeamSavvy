using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TeamSavvy.Api.BusinessModel.DataTransferModel;
using TeamSavvy.Api.Web.Models;

namespace TeamSavvy.Api.Utilities.MapperRegistration
{
    public class TeamSavvyProfiler : Profile
    {
        public TeamSavvyProfiler()
        {
            //Employee endpoint
            CreateMap<Employee, EmployeeDto>(MemberList.Destination);
            CreateMap<EmployeeDto, Employee>(MemberList.Source);

            //TimeSheet endpoint
            CreateMap<TimeSheet, TimeSheetDto>().ReverseMap();

            //Project endpoint
            CreateMap<Project, ProjectDto>()
                .ReverseMap();
            //CreateMap<ProjectDto, EmployeeProject>()
            //     .ForMember(v => v.EmployeeProjectId, opt => opt.MapFrom(v => v.EmployeeProjectId))
            //     .ForMember(v => v.EmployeeId, opt => opt.MapFrom(v => v.EmployeeId))
            //     .ForMember(v => v.ProjectId, opt => opt.MapFrom(v => v.ProjectId))
            //     .ForMember(v => v.Status, opt => opt.MapFrom(v => v.EmployeeProjectStatus))
            //     .ReverseMap();

        }
    }
}
