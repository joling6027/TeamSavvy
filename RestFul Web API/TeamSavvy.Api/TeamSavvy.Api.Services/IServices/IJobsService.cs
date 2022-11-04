using System;
using System.Collections.Generic;
using System.Text;
using TeamSavvy.Api.BusinessModel.DataTransferModel;

namespace TeamSavvy.Api.Services.IServices
{
    public interface IJobsService
    {
        JobDto GetJobById(int id);
        List<JobDto> GetJobs();
        bool AddJob(JobDto job);
        bool UpdateJob(JobDto job);
        bool DeleteJob(int id);
    }
}
