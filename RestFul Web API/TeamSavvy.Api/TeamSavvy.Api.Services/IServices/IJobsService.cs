﻿using System;
using System.Collections.Generic;
using System.Text;
using TeamSavvy.Api.BusinessModel.DataTransferModel;

namespace TeamSavvy.Api.Services.IServices
{
    public interface IJobsService
    {
        JobDto GetJobById(int id);
        List<EmployeeDto> GetEmployeesAppliedJob(int id);
        List<JobDto> GetJobs();
        bool AppliedJob(JobAppliedDto applied);
        bool AddJob(JobDto job);
        bool UpdateJob(JobDto job);
        bool DeleteJob(int id);
    }
}
