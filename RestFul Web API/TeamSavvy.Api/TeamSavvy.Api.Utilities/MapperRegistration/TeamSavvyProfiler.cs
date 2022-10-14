using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TeamSavvy.Api.BusinessModel.DataTransferModel;
using TeamSavvy.Api.Web.Entities;

namespace TeamSavvy.Api.Utilities.MapperRegistration
{
    public class TeamSavvyProfiler : Profile
    {
        public TeamSavvyProfiler()
        {
            //Employee endpoint
            CreateMap<Employee, EmployeeDto>(MemberList.Destination);
            CreateMap<EmployeeDto, Employee>(MemberList.Source);
            CreateMap<EmployeeAddDto, Employee>().ReverseMap();

            //TimeSheet endpoint
            CreateMap<TimeSheet, TimeSheetDto>().ReverseMap();

            //Project endpoint
            CreateMap<Project, ProjectDto>()
                .ReverseMap();

            //Address endpoint
            CreateMap<Task, TaskDto>()
                    .ReverseMap();

        }
    }
}
