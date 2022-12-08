﻿using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TeamSavvy.Api.BusinessModel.DataTransferModel;
using TeamSavvy.Api.Entities.Models;

namespace TeamSavvy.Api.Utilities.MapperRegistration
{
    public class TeamSavvyProfiler : Profile
    {
        public TeamSavvyProfiler()
        {
            //Employee endpoint
            CreateMap<EmployeeDto, Employee>()
                .ReverseMap();
            CreateMap<EmployeeSkillDto, EmployeeSkill>()
                .ReverseMap();

            //Address
            CreateMap<AddressDto, Address>().ReverseMap();

            //TimeSheet endpoint
            CreateMap<TimeSheet, TimeSheetDto>().ReverseMap();

            //Project endpoint
            CreateMap<Project, ProjectDto>()
                .ReverseMap();

            //Address endpoint
            CreateMap<Task, TaskDto>()
                    .ReverseMap();
            
            //Payroll endpoint
            CreateMap<Payroll, PayrollDto>()
                    .ReverseMap();
            CreateMap<EmployeeProject, EmployeeProjectDto>()
            .ReverseMap();

            //Salary endpoint
            CreateMap<Salary, SalaryDto>()
                    .ReverseMap();
            
            //Leaves endpoint
            CreateMap<EmployeeLeave, EmployeeLeaveDto>()
                    .ReverseMap();

            //job endpoint
            CreateMap<JobDto, Job>()
                  .ReverseMap();
            CreateMap<JobSkillsDto, JobSkills>()
                 .ReverseMap();
            CreateMap<JobAppliedDto, JobApplied>()
                 .ReverseMap();

            //skill endpoint
            CreateMap<Skill, SkillDto>()
                 .ReverseMap();


            //role endpoint
            CreateMap<Role, RoleDto>()
                 .ReverseMap();

            //role endpoint
            CreateMap<Department, DepartmentDto>()
                 .ReverseMap();

            CreateMap<Salary, SalaryDto>()
                 .ReverseMap();
            CreateMap<Payroll, PayrollDto>()
                 .ReverseMap();

            CreateMap<Leave, LeaveDto>()
            .ReverseMap();

            CreateMap<Widget, WidgetDto>()
          .ReverseMap();
        }
    }
}
