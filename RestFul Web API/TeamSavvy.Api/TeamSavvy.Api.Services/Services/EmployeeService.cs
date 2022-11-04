using AutoMapper;
using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using TeamSavvy.Api.BusinessModel.DataTransferModel;
using TeamSavvy.Api.Entities.GenericRepo;
using TeamSavvy.Api.Services.IServices;
using TeamSavvy.Api.Entities.Context;
using TeamSavvy.Api.Entities.Models;

namespace TeamSavvy.Api.Services.Services
{
    public class EmployeeService : IEmployeeService
    {
        #region Private Member Variables
        /// <summary>
        /// Initialise generic data context variable.
        /// </summary>
        private readonly GenericUnitOfWork<TeamSavvyContext> _unitOfWork;
        private readonly IMapper _mapper;
        #endregion

        #region constructor
        public EmployeeService(GenericUnitOfWork<TeamSavvyContext> unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        #endregion


        public bool AddEmployee(EmployeeDto employee)
        {
            //need to work on it
            bool isSuccess = false;
            try
            {
                if (employee != null)
                {

                    var addr = _mapper.Map<Address>(employee.Address);
                    _unitOfWork.Repository<Address>().Insert(addr);
                    _unitOfWork.SaveChanges();
                    var emp = _mapper.Map<Employee>(employee);
                    emp.AddressId = addr.AddressId;

                    _unitOfWork.Repository<Employee>().Insert(emp);
                    _unitOfWork.SaveChanges();

                    var skills = _mapper.Map<List<EmployeeSkill>>(employee.Skills);
                    skills.ForEach(skill => skill.EmployeeId = emp.EmployeeId);
                    _unitOfWork.Repository<EmployeeSkill>().Insert(skills);
                    _unitOfWork.SaveChanges();


                    if (emp.EmployeeId > 0 && skills.Any() && addr.AddressId > 0)
                    {
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

        public List<EmployeeDto> GetAllEmployees()
        {
            var empSkills = _unitOfWork.Context.EmployeeSkill
                            .Join(_unitOfWork.Context.Skill,
                             empsk => empsk.SkillId,
                             sk => sk.SkillId,
                             (empsk, sk) => new { EmpSk = empsk, Sk = sk })
                             .Select(x => new EmployeeSkillDto
                             {
                                 EmployeeId = x.EmpSk.EmployeeId,
                                 EmployeeSkillId = x.EmpSk.EmployeeSkillId,
                                 Skills = new SkillDto
                                 {
                                     SkillId = x.Sk.SkillId,
                                     SkillName = x.Sk.SkillName,
                                 },
                                 Isactive = x.EmpSk.Isactive
                             })
                             .ToList();

            var emps = _unitOfWork.Context.Employee
                      .Join(_unitOfWork.Context.Address,
                       emp => emp.AddressId,
                       addr => addr.AddressId,
                       (emp, addr) => new { Emp = emp, Addr = addr })
                      .Join(_unitOfWork.Context.JobLocation,
                       em => em.Emp.JobLocationId,
                       jobAddr => jobAddr.JobLocationId,
                       (em, jobAddr) => new { Em = em, JobAddr = jobAddr })
                      .Select(x => new EmployeeDto
                      {

                          EmployeeId = x.Em.Emp.EmployeeId,
                          EmployeeFirstname = x.Em.Emp.EmployeeFirstname.Trim(),
                          EmployeeLastname = x.Em.Emp.EmployeeLastname.Trim(),
                          Dateofbirth = x.Em.Emp.Dateofbirth,
                          Email = x.Em.Emp.Email.Trim(),
                          Hiredate = x.Em.Emp.Hiredate,
                          //DepartmentId = x.Em.Emp.DepartmentId,
                          Department = _unitOfWork.Context.Department.Where(y => y.DepartmentId == x.Em.Emp.DepartmentId).Select(x => new DepartmentDto { DepartmentId = x.DepartmentId, DepartmentName = x.DepartmentName }).FirstOrDefault(),
                          Extension = x.Em.Emp.Extension,
                          Phone = x.Em.Emp.Phone.Trim(),
                          Bankaccount = x.Em.Emp.Bankaccount.Trim(),
                          Bankname = x.Em.Emp.Bankname.Trim(),
                          Bankcode = x.Em.Emp.Bankcode.Trim(),
                          Role = _unitOfWork.Context.Role.Where(y => y.RoleId == x.Em.Emp.RoleId).Select(x => new RoleDto { RoleId = x.RoleId, RoleType = x.RoleType }).FirstOrDefault(),
                          Status = _unitOfWork.Context.Status.Where(y => y.StatusId == x.Em.Emp.StatusId).Select(x => new StatusDto { StatusId = x.StatusId, StatusType = x.StatusType }).FirstOrDefault(),
                          //RoleId = x.Em.Emp.RoleId,
                          //StatusId = x.Em.Emp.StatusId,
                          EmployeeImage = x.Em.Emp.EmployeeImage,
                          JobLocation = new JobLocationDto
                          {
                              JobLocationId = x.Em.Emp.JobLocationId,
                              Location = x.JobAddr.Location,
                              City = _unitOfWork.Context.City.Where(y => y.CityId == x.JobAddr.CityId)
                              .Select(x => new CityDto
                              {
                                  CityId = x.CityId,
                                  CityName = x.CityName,
                                  Province = _unitOfWork.Context.Province.Where(p => p.ProvinceId == x.ProvinceId).Select(s => new ProvinceDto
                                  {
                                      ProvinceId = s.ProvinceId,
                                      ProvinceAbbr = s.ProvinceAbbr,
                                      ProvinceName = s.ProvinceName,
                                      Country = _unitOfWork.Context.Country.Where(y => y.CountryId == s.CountryId).Select(c => new CountryDto
                                      {
                                          CountryId = c.CountryId,
                                          CountryName = c.CountryName,
                                      }).FirstOrDefault(),
                                  }).FirstOrDefault()

                              }).FirstOrDefault(),
                              //CityId = x.JobAddr.CityId,
                              Postcode = x.JobAddr.Postcode
                          },
                          Address = new AddressDto
                          {
                              AddressId = x.Em.Emp.AddressId,
                              Apartment = x.Em.Addr.Apartment,
                              Postcode = x.Em.Addr.Postcode,
                              City = _unitOfWork.Context.City.Where(y => y.CityId == x.Em.Addr.CityId)
                              .Select(x => new CityDto
                              {
                                  CityId = x.CityId,
                                  CityName = x.CityName,
                                  Province = _unitOfWork.Context.Province.Where(p => p.ProvinceId == x.ProvinceId).Select(s => new ProvinceDto
                                  {
                                      ProvinceId = s.ProvinceId,
                                      ProvinceAbbr = s.ProvinceAbbr,
                                      ProvinceName = s.ProvinceName,
                                      Country = _unitOfWork.Context.Country.Where(y => y.CountryId == s.CountryId).Select(c => new CountryDto
                                      {
                                          CountryId = c.CountryId,
                                          CountryName = c.CountryName,
                                      }).FirstOrDefault(),
                                  }).FirstOrDefault()

                              }).FirstOrDefault(),
                              //CityId = x.Em.Addr.CityId
                          }

                      })
                      .ToList();

            if (emps != null && emps.Any() && empSkills != null && empSkills.Any())
            {
                foreach (var emp in emps)
                {
                    emp.Skills = empSkills.Where(x=>x.EmployeeId == emp.EmployeeId).ToList();
                }
            }

            return emps;
        }

        public EmployeeDto GetEmployeeById(int id)
        {
            var empSkills = _unitOfWork.Context.EmployeeSkill
                            .Join(_unitOfWork.Context.Skill,
                             empsk => empsk.SkillId,
                             sk => sk.SkillId,
                             (empsk, sk) => new { EmpSk = empsk, Sk = sk })
                             .Where(x => x.EmpSk.EmployeeId == id)
                             .Select(x => new EmployeeSkillDto
                             {
                                 EmployeeId = x.EmpSk.EmployeeId,
                                 EmployeeSkillId = x.EmpSk.EmployeeSkillId,
                                 Skills = new SkillDto
                                 {
                                     SkillId = x.Sk.SkillId,
                                     SkillName = x.Sk.SkillName,
                                 },
                                 Isactive = x.EmpSk.Isactive
                             })
                             .ToList();

            var emp = _unitOfWork.Context.Employee
                      .Join(_unitOfWork.Context.Address,
                       emp => emp.AddressId,
                       addr => addr.AddressId,
                       (emp, addr) => new { Emp = emp, Addr = addr })
                      .Join(_unitOfWork.Context.JobLocation,
                       em => em.Emp.JobLocationId,
                       jobAddr => jobAddr.JobLocationId,
                       (em, jobAddr) => new {Em = em, JobAddr = jobAddr })
                      .Where(x => x.Em.Emp.EmployeeId == id)
                      .Select(x => new EmployeeDto
                      {
                          EmployeeId = x.Em.Emp.EmployeeId,
                          EmployeeFirstname = x.Em.Emp.EmployeeFirstname.Trim(),
                          EmployeeLastname = x.Em.Emp.EmployeeLastname.Trim(),
                          Dateofbirth = x.Em.Emp.Dateofbirth,
                          Email = x.Em.Emp.Email.Trim(),
                          Hiredate = x.Em.Emp.Hiredate,
                          //DepartmentId = x.Em.Emp.DepartmentId,
                          Department = _unitOfWork.Context.Department.Where(y => y.DepartmentId == x.Em.Emp.DepartmentId).Select(x => new DepartmentDto { DepartmentId = x.DepartmentId, DepartmentName = x.DepartmentName }).FirstOrDefault(),
                          Extension = x.Em.Emp.Extension,
                          Phone = x.Em.Emp.Phone.Trim(),
                          Bankaccount = x.Em.Emp.Bankaccount.Trim(),
                          Bankname = x.Em.Emp.Bankname.Trim(),
                          Bankcode = x.Em.Emp.Bankcode.Trim(),
                          Role = _unitOfWork.Context.Role.Where(y=>y.RoleId == x.Em.Emp.RoleId).Select(x => new RoleDto { RoleId = x.RoleId, RoleType= x.RoleType}).FirstOrDefault(),
                          Status = _unitOfWork.Context.Status.Where(y => y.StatusId == x.Em.Emp.StatusId).Select(x => new StatusDto { StatusId = x.StatusId, StatusType = x.StatusType }).FirstOrDefault(),
                          //RoleId = x.Em.Emp.RoleId,
                          //StatusId = x.Em.Emp.StatusId,
                          EmployeeImage = x.Em.Emp.EmployeeImage,
                          JobLocation = new JobLocationDto
                          {
                              JobLocationId = x.Em.Emp.JobLocationId,
                              Location = x.JobAddr.Location,
                              City = _unitOfWork.Context.City.Where(y => y.CityId == x.JobAddr.CityId)
                              .Select(x => new CityDto 
                              {
                                  CityId = x.CityId,
                                  CityName = x.CityName,
                                  Province = _unitOfWork.Context.Province.Where(p => p.ProvinceId == x.ProvinceId).Select(s => new ProvinceDto
                                  {
                                      ProvinceId = s.ProvinceId,
                                      ProvinceAbbr = s.ProvinceAbbr,
                                      ProvinceName = s.ProvinceName,
                                      Country = _unitOfWork.Context.Country.Where(y => y.CountryId == s.CountryId).Select(c => new CountryDto
                                      { 
                                          CountryId = c.CountryId,
                                          CountryName = c.CountryName,
                                      }).FirstOrDefault(),
                                  }).FirstOrDefault()
                                  
                              }).FirstOrDefault(),
                              //CityId = x.JobAddr.CityId,
                              Postcode = x.JobAddr.Postcode
                          },
                          Address = new AddressDto
                          {
                              AddressId = x.Em.Emp.AddressId,
                              Apartment = x.Em.Addr.Apartment,
                              Postcode = x.Em.Addr.Postcode,
                              City = _unitOfWork.Context.City.Where(y => y.CityId == x.Em.Addr.CityId)
                              .Select(x => new CityDto
                              {
                                  CityId = x.CityId,
                                  CityName = x.CityName,
                                  Province = _unitOfWork.Context.Province.Where(p => p.ProvinceId == x.ProvinceId).Select(s => new ProvinceDto
                                  {
                                      ProvinceId = s.ProvinceId,
                                      ProvinceAbbr = s.ProvinceAbbr,
                                      ProvinceName = s.ProvinceName,
                                      Country = _unitOfWork.Context.Country.Where(y => y.CountryId == s.CountryId).Select(c => new CountryDto
                                      {
                                          CountryId = c.CountryId,
                                          CountryName = c.CountryName,
                                      }).FirstOrDefault(),
                                  }).FirstOrDefault()

                              }).FirstOrDefault(),
                              //CityId = x.Em.Addr.CityId
                          }
                      })
                      .FirstOrDefault();

            if (emp != null && empSkills != null && empSkills.Any())
            {
                emp.Skills = empSkills;
            }

            return emp;
        }

        public bool UpdateEmployee(EmployeeDto employee)
        {
            bool isSuccess = false;
            try
            {
                if (employee != null)
                {



                    var addr = new Address
                    {
                        AddressId = employee.Address.AddressId,
                        Apartment = employee.Address.Apartment,
                        Postcode = employee.Address.Postcode,
                        CityId = employee.Address.City.CityId
                    };
                        //_mapper.Map<Address>(employee.Address);

                    _unitOfWork.Repository<Address>().Update(addr);
                    if (addr.AddressId > 0)
                    {
                        var empUpdate = new Employee
                        {
                            AddressId = employee.Address.AddressId,
                            Bankaccount = employee.Bankaccount,
                            Bankcode = employee.Bankcode,
                            Bankname = employee.Bankname,
                            Dateofbirth = employee.Dateofbirth,
                            DepartmentId = employee.Department.DepartmentId,
                            Email = employee.Email,
                            EmployeeFirstname = employee.EmployeeFirstname,
                            EmployeeId = employee.EmployeeId,
                            EmployeeLastname = employee.EmployeeLastname,
                            EmployeeImage = employee.EmployeeImage,
                            Extension = employee.Extension,
                            Hiredate = employee.Hiredate,
                            JobLocationId = employee.JobLocation.JobLocationId,
                            Password = employee.Password,
                            Phone = employee.Phone,
                            RoleId =employee.Role.RoleId,
                            StatusId = employee.Status.StatusId,
                        };
                            //_mapper.Map<EmployeeDto, Employee>(employee);
                        //empUpdate.AddressId = addr.AddressId;
                        _unitOfWork.Context.Update(empUpdate);
                    }

                    var skills = _mapper.Map<List<EmployeeSkill>>(employee.Skills);
                   
                    //skills.ForEach(skill =>  employee.Skills.ForEach(s => skill.SkillId = s.Skills.SkillId));
                    _unitOfWork.Repository<EmployeeSkill>().Update(skills);
                    _unitOfWork.SaveChanges();
                    isSuccess = true;
                }
            }
            catch (Exception e)
            {
                isSuccess = false;
            }

            return isSuccess;
        }

        public bool DeleteEmployee(int id, string status)
        {

            bool isSuccess = false;
            try
            {
                if (id > 0)
                {
                    Employee employee = _unitOfWork.Context.Employee.Where(x => x.EmployeeId == id).FirstOrDefault();
                    if (employee != null)
                    {
                        var statusId = _unitOfWork.Context.Status
                                                        .Where(x => x.StatusType == status)
                                                        .Select(x => x.StatusId)
                                                        .FirstOrDefault();
                        employee.StatusId = statusId;
                    }

                    _unitOfWork.Context.Update(employee);
                    _unitOfWork.SaveChanges();
                    isSuccess = true;
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
