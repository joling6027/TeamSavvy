using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;
using TeamSavvy.Api.BusinessModel.DataTransferModel;
using TeamSavvy.Api.Entities.Context;
using TeamSavvy.Api.Entities.GenericRepo;
using TeamSavvy.Api.Services.IServices;
using TeamSavvy.Api.Entities.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore.Internal;

namespace TeamSavvy.Api.Services.Services
{
    public class JobsService : IJobsService
    {
        #region Private Member Variables
        /// <summary>
        /// Initialise generic data context variable.
        /// </summary>
        private readonly GenericUnitOfWork<TeamSavvyContext> _unitOfWork;
        private readonly IMapper _mapper;
        #endregion

        #region constructor
        public JobsService(GenericUnitOfWork<TeamSavvyContext> unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        #endregion

        public bool AddJob(JobDto job)
        {
            bool isSuccess = false;
            try
            {
                if (job != null)
                {
                    var jb = _mapper.Map<Job>(job);
                    if (jb != null)
                    {
                        _unitOfWork.Repository<Job>().Insert(jb);
                        _unitOfWork.SaveChanges();
                        //var skills = _mapper.Map<List<JobSkills>>(job.JobSkills);
                        //skills.ForEach(skill => skill.Jobid = jb.JobId);
                        //_unitOfWork.Repository<JobSkills>().Insert(skills);
                        //_unitOfWork.SaveChanges();
                        isSuccess = true;
                    }

                }
            }
            catch (Exception e)
            {
                isSuccess = false;
            }

            return isSuccess;
        }

        public bool DeleteJob(int id)
        {
            bool isSuccess = false;
            try
            {
                if (id > 0)
                {
                    var job = _unitOfWork.Context.Job.Where(x => x.JobId == id).FirstOrDefault();
                    if (job != null)
                    {
                        var jb = _mapper.Map<Job>(job);
                        if (jb != null)
                        {
                             jb.Isdelete = true;
                            _unitOfWork.Repository<Job>().Update(jb);
                            _unitOfWork.SaveChanges();
                            isSuccess = true;
                        }
                    }
                }
            }
            catch (Exception e)
            {
                isSuccess = false;
            }

            return isSuccess;
        }

        public JobDto GetJobById(int id)
        {
            JobDto job;  
            try
            {
                    var jobSkills = _unitOfWork.Context.JobSkills
                                    .Join(_unitOfWork.Context.Skill,
                                     jbSk => jbSk.Skillid,
                                     sk => sk.SkillId,
                                     (jbSk, sk) => new { JobSk = jbSk, Sk = sk })
                                     .Where(x => x.JobSk.Jobid == id)
                                     .Select(x => new JobSkillsDto
                                     {
                                         Jobid = x.JobSk.Jobid,
                                         Jobskillid = x.JobSk.Jobskillid,
                                         Skillid = x.JobSk.Skillid,
                                         Skills = new SkillDto
                                         {
                                             SkillId = x.Sk.SkillId,
                                             SkillName = x.Sk.SkillName,
                                         },
                                     }).ToList();


                    job = _unitOfWork.Context.Job
                      .Where(j => j.JobId == id && j.Isdelete == false)
                      .Select(x => new JobDto
                      {
                          JobId = x.JobId,
                          CreatedOn = x.CreatedOn,
                          Deadline = x.Deadline,
                          Details = x.Details,
                          Isdelete = x.Isdelete,
                          JobPosition = x.JobPosition,
                          Responsibilities = x.Responsibilities,
                          Salary = x.Salary,
                      }).FirstOrDefault();

                    if (job != null && jobSkills != null && jobSkills.Any())
                    {
                        job.JobSkills = jobSkills;
                    }
            }
            catch (Exception ex)
            {
                return job = null;
            }
            return job;
        }

        public List<JobDto> GetJobs()
        {
            List<JobDto> jobs;
            try
            {
                var jobSkills = _unitOfWork.Context.JobSkills
                                .Join(_unitOfWork.Context.Skill,
                                 jbSk => jbSk.Skillid,
                                 sk => sk.SkillId,
                                 (jbSk, sk) => new { JobSk = jbSk, Sk = sk })
                                 .Select(x => new JobSkillsDto
                                 {
                                     Jobid = x.JobSk.Jobid,
                                     Jobskillid = x.JobSk.Jobskillid,
                                     Skillid = x.JobSk.Skillid,
                                     Skills = new SkillDto
                                     {
                                         SkillId = x.Sk.SkillId,
                                         SkillName = x.Sk.SkillName,
                                     },
                                 }).ToList();


                jobs = _unitOfWork.Context.Job
                   .Where(j => j.Isdelete == false)
                  .Select(x => new JobDto
                  {
                      JobId = x.JobId,
                      CreatedOn = x.CreatedOn,
                      Deadline = x.Deadline,
                      Details = x.Details,
                      Isdelete = x.Isdelete,
                      JobPosition = x.JobPosition,
                      Responsibilities = x.Responsibilities,
                      Salary = x.Salary,
                  }).ToList();

                if (jobs != null && jobSkills != null && jobSkills.Any())
                {
                    foreach (var job in jobs)
                    {
                        job.JobSkills = jobSkills.Where(x => x.Jobid == job.JobId).ToList();
                    }
                }
            }
            catch (Exception ex)
            {
                return jobs = null;
            }
            return jobs;
        }

        public bool UpdateJob(JobDto job)
        {
            bool isSuccess = false;
            try
            {
                if (job != null)
                {
                    var jb = _mapper.Map<Job>(job);
                    if (jb != null)
                    {
                        _unitOfWork.Repository<Job>().Update(jb);
                        _unitOfWork.SaveChanges();
                        //need to work on this
                        var skills = _mapper.Map<List<JobSkills>>(job.JobSkills);
                        _unitOfWork.Repository<JobSkills>().Update(skills);
                        _unitOfWork.SaveChanges();
                        isSuccess = true;
                    }

                }
            }
            catch (Exception e)
            {
                isSuccess = false;
            }

            return isSuccess;
        }
    }
}
