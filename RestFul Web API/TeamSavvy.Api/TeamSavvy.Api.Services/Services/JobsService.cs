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
using JobApplied = TeamSavvy.Api.Entities.Models.JobApplied;

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

        public bool AppliedJob(JobAppliedDto applied)
        {
            bool isSuccess = false;
            try
            {
                if (applied != null)
                {
                    var jb = _mapper.Map<JobApplied>(applied);
                    if (jb != null)
                    {
                        _unitOfWork.Repository<JobApplied>().Insert(jb);
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
                            _unitOfWork.Repository<Job>().Delete(jb);
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

        public List<EmployeeDto> GetEmployeesAppliedJob(int id)
        {
            List<EmployeeDto> employees = null;
            try
            {
                var emps = _unitOfWork.Context.JobApplied
                    .Where(x => x.JobId == id)
                    .Select(e => e.EmployeeId).ToList();
                if(emps.Any())
                {
                    employees = new List<EmployeeDto>();
                    foreach (var empId in emps)
                    {
                        var emp = _unitOfWork.Context.Employee.Where(x => x.EmployeeId == empId)
                                   .Select(e => new EmployeeDto
                                   {
                                       EmployeeId = empId,
                                       EmployeeFirstname = e.EmployeeFirstname.Trim(),
                                       EmployeeLastname = e.EmployeeLastname.Trim(),
                                       Email = e.Email,
                                       Department = _unitOfWork.Context.Department.Where(d => d.DepartmentId == e.DepartmentId)
                                       .Select(s => new DepartmentDto
                                       {
                                           DepartmentId = s.DepartmentId,
                                           DepartmentName = s.DepartmentName.Trim(),
                                       }).FirstOrDefault(),
                                       Role = _unitOfWork.Context.Role.Where(r => r.RoleId == e.RoleId)
                                       .Select(r => new RoleDto
                                       {
                                           RoleId = r.RoleId,
                                           RoleType = r.RoleType.Trim(),
                                       }).FirstOrDefault()
                                   }).FirstOrDefault();
                        employees.Add(emp);
                    }
                }
            }
            catch(Exception ex)
            {
                employees = null;
            }

            return employees;
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
                    var jb = new Job
                    {
                        JobId = job.JobId,
                        Details = job.Details,
                        Responsibilities = job.Responsibilities,
                        Salary = job.Salary,
                        CreatedOn = job.CreatedOn,
                        JobPosition = job.JobPosition,
                        Deadline = job.Deadline,
                        Isdelete = job.Isdelete,
                    };

                    if (jb != null)
                    {

                        _unitOfWork.Repository<Job>().Update(jb);
                        var skillsDelete = new List<JobSkills>();
                        var skillsAdd = new List<JobSkills>();
                        foreach (var jobSkill in job.JobSkills)
                        {
                            if (jobSkill.Isactive)
                            {
                                var IsExist = _unitOfWork.Context.JobSkills.Where(sk => sk.Skillid == (jobSkill.Skillid <= 0 ? jobSkill.Skills.SkillId : jobSkill.Skillid) && sk.Jobid == jobSkill.Jobid).Any();
                                if(!IsExist)
                                {
                                    skillsAdd.Add(new JobSkills
                                    {
                                        Jobid = jobSkill.Jobid,
                                        Isactive = jobSkill.Isactive,
                                        Skillid = jobSkill.Skillid <= 0 ? jobSkill.Skills.SkillId : jobSkill.Skillid,

                                    });
                                }
                               
                            }
                            if (!jobSkill.Isactive)
                            {
                                skillsDelete.Add(new JobSkills
                                {
                                    Jobskillid = jobSkill.Jobskillid,
                                    Jobid = jobSkill.Jobid,
                                    Isactive = jobSkill.Isactive,
                                    Skillid = jobSkill.Skillid <= 0 ? jobSkill.Skills.SkillId : jobSkill.Skillid,
                                });

                            }
                        }

                        if (skillsDelete.Any())
                        {
                            _unitOfWork.Repository<JobSkills>().Delete(skillsDelete);
                            _unitOfWork.SaveChanges();
                        }

                        if (skillsAdd.Any())
                        {
                            _unitOfWork.Repository<JobSkills>().Insert(skillsAdd);
                            _unitOfWork.SaveChanges();
                        }
          
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
