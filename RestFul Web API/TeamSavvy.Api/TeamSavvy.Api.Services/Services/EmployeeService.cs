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
                                 SkillId = x.EmpSk.SkillId,
                                 Isactive = x.EmpSk.Isactive
                             })
                             .ToList();

            var emps = _unitOfWork.Context.Employee
                      .Join(_unitOfWork.Context.Address,
                       emp => emp.AddressId,
                       addr => addr.AddressId,
                       (emp, addr) => new { Emp = emp, Addr = addr })
                      .Select(x => new EmployeeDto
                      {
                          EmployeeId = x.Emp.EmployeeId,
                          EmployeeFirstname = x.Emp.EmployeeFirstname.Trim(),
                          EmployeeLastname = x.Emp.EmployeeLastname.Trim(),
                          Dateofbirth = x.Emp.Dateofbirth,
                          Email = x.Emp.Email.Trim(),
                          Hiredate = x.Emp.Hiredate,
                          DepartmentId = x.Emp.DepartmentId,
                          JobLocationId = x.Emp.JobLocationId,
                          Extension = x.Emp.Extension,
                          Phone = x.Emp.Phone.Trim(),
                          Bankaccount = x.Emp.Bankaccount.Trim(),
                          RoleId = x.Emp.RoleId,
                          StatusId = x.Emp.StatusId,
                          EmployeeImage = x.Emp.EmployeeImage,
                          Address = new AddressDto
                          {
                              AddressId = x.Emp.AddressId,
                              Apartment = x.Addr.Apartment,
                              Postcode = x.Addr.Postcode,
                              CityId = x.Addr.CityId
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
                                 SkillId = x.EmpSk.SkillId,
                                 Isactive = x.EmpSk.Isactive
                             })
                             .ToList();

            var emp = _unitOfWork.Context.Employee
                      .Join(_unitOfWork.Context.Address,
                       emp => emp.AddressId,
                       addr => addr.AddressId,
                       (emp, addr) => new { Emp = emp, Addr = addr })
                      .Where(x => x.Emp.EmployeeId == id)
                      .Select(x => new EmployeeDto
                      {
                          EmployeeId = x.Emp.EmployeeId,
                          EmployeeFirstname = x.Emp.EmployeeFirstname.Trim(),
                          EmployeeLastname = x.Emp.EmployeeLastname.Trim(),
                          Dateofbirth = x.Emp.Dateofbirth,
                          Email = x.Emp.Email.Trim(),
                          Hiredate = x.Emp.Hiredate,
                          DepartmentId = x.Emp.DepartmentId,
                          JobLocationId = x.Emp.JobLocationId,
                          Extension = x.Emp.Extension,
                          Phone = x.Emp.Phone.Trim(),
                          Bankaccount = x.Emp.Bankaccount.Trim(),
                          RoleId = x.Emp.RoleId,
                          StatusId = x.Emp.StatusId,
                          EmployeeImage = x.Emp.EmployeeImage,
                          Address = new AddressDto
                          {
                              AddressId = x.Emp.AddressId,
                              Apartment = x.Addr.Apartment,
                              Postcode = x.Addr.Postcode,
                              CityId = x.Addr.CityId
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
                    var addr = _mapper.Map<Address>(employee.Address);

                    _unitOfWork.Repository<Address>().Update(addr);
                    if (addr.AddressId > 0)
                    {
                        var empUpdate = _mapper.Map<EmployeeDto, Employee>(employee);
                        empUpdate.AddressId = addr.AddressId;
                        _unitOfWork.Context.Update(empUpdate);
                    }

                    var skills = _mapper.Map<List<EmployeeSkill>>(employee.Skills);
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
