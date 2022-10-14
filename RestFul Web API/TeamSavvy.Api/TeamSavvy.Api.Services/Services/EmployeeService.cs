using AutoMapper;
using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using TeamSavvy.Api.BusinessModel.DataTransferModel;
using TeamSavvy.Api.Entities.GenericRepo;
using TeamSavvy.Api.Services.IServices;
using TeamSavvy.Api.Entities.Context;
using TeamSavvy.Api.Web.Entities;

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


        public bool AddEmployee(EmployeeAddDto employee)
        {
            bool isSuccess = false;
            try
            {
                if (employee != null)
                {

                    // need to change ids fields because we can get the ids from front end as these ids are fixed. and for dropdowns.
                    //var roleId = _unitOfWork.Context.Role
                    //             .Where(x => x.RoleType == employee.Role)
                    //             .FirstOrDefault()
                    //             .RoleId;

                    //var deptId = _unitOfWork.Context.Department
                    //            .Where(x => x.DepartmentName == employee.Department.DepartmentName)
                    //            .Select(x=>x.DepartmentId)
                    //            .FirstOrDefault();

                    //var statusId = _unitOfWork.Context.Status
                    //               .Where(x => x.StatusType == employee.Status.StatusType)
                    //               .Select(x => x.StatusId)
                    //               .FirstOrDefault();

                    //var jobLocId = _unitOfWork.Context.JobLocation
                    //              .Where(x => x.Location == employee.JobLocation.Location)
                    //              .Select(x => x.JobLocationId)
                    //              .FirstOrDefault();

                    //if(roleId > 0 && deptId > 0 && statusId > 0 && jobLocId > 0)
                    //{

                    Address address = new Address
                    {
                        Apartment = employee.Address.Apartment,
                        CityId = employee.Address.City.CityId,
                        Postcode = employee.Address.Postcode,
                    };

                    _unitOfWork.Repository<Address>().Insert(address);
                    _unitOfWork.SaveChanges();

                    Employee emp = new Employee
                    {
                        RoleId = employee.RoleId,
                        EmployeeFirstname = employee.EmployeeFirstname,
                        EmployeeLastname = employee.EmployeeLastname,
                        Dateofbirth = employee.Dateofbirth,
                        Hiredate = employee.Hiredate,
                        Phone = employee.Phone,
                        Email = employee.Email,
                        Bankaccount = employee.Bankaccount,
                        DepartmentId = employee.DepartmentId,
                        StatusId = employee.StatusId,
                        JobLocationId = employee.JobLocationId,
                        AddressId = address.AddressId,
                        Extension = employee.Extension,
                        Password = employee.Password,
                    };

                    _unitOfWork.Repository<Employee>().Insert(emp);
                    _unitOfWork.SaveChanges();


                    EmployeeSkill employeeSkill = new EmployeeSkill
                    {
                        EmployeeId = emp.EmployeeId,
                        Isactive = employee.EmployeeSkill.Isactive,
                        SkillId = employee.EmployeeSkill.SkillId
                    };

                    _unitOfWork.Repository<EmployeeSkill>().Insert(employeeSkill);
                    _unitOfWork.SaveChanges();

                    if (emp.EmployeeId > 0 && employeeSkill.EmployeeSkillId > 0 && address.AddressId > 0)
                    {
                        isSuccess = true;
                    }
                }
                //}
            }
            catch (Exception e)
            {
                isSuccess = false;
            }
            return isSuccess;
        }

        public List<EmployeeDto> GetAllEmployees()
        {
            return GetEmployeesList(null);
        }

        private List<EmployeeDto> GetEmployeesList(string name)
        {
            List<EmployeeDto> empRes = null;
            if (name == null || string.IsNullOrWhiteSpace(name))
            {
                empRes = (List<EmployeeDto>)(from emp in _unitOfWork.Context.Employee
                                           join depart in _unitOfWork.Context.Department on emp.DepartmentId equals depart.DepartmentId
                                           join stat in _unitOfWork.Context.Status on emp.StatusId equals stat.StatusId
                                           join job in _unitOfWork.Context.JobLocation on emp.JobLocationId equals job.JobLocationId
                                           join addr in _unitOfWork.Context.Address on emp.AddressId equals addr.AddressId
                                           join cty in _unitOfWork.Context.City on addr.CityId equals cty.CityId
                                           join prov in _unitOfWork.Context.Province on cty.ProvinceId equals prov.ProvinceId
                                           join contr in _unitOfWork.Context.Country on prov.CountryId equals contr.CountryId
                                           join rol in _unitOfWork.Context.Role on emp.RoleId equals rol.RoleId
                                           join empSkill in _unitOfWork.Context.EmployeeSkill on emp.EmployeeId equals empSkill.EmployeeId
                                           join empSk in _unitOfWork.Context.Skill on empSkill.SkillId equals empSk.SkillId
                                           select new EmployeeDto
                                           {
                                               EmployeeId = emp.EmployeeId,
                                               Bankaccount = emp.Bankaccount.Trim(),
                                               Dateofbirth = emp.Dateofbirth,
                                               Email = emp.Email.Trim(),
                                               EmployeeFirstname = emp.EmployeeFirstname.Trim(),
                                               EmployeeLastname = emp.EmployeeLastname.Trim(),
                                               Extension = emp.Extension,
                                               Hiredate = emp.Hiredate,
                                               Phone = emp.Phone.Trim(),
                                               Role = rol.RoleType.Trim(),
                                               Department = new DepartmentDto
                                               {
                                                   DepartmentId = depart.DepartmentId,
                                                   DepartmentName = depart.DepartmentName.Trim()
                                               },
                                               Status = new StatusDto
                                               {
                                                   StatusId = stat.StatusId,
                                                   StatusType = stat.StatusType.Trim(),
                                               },
                                               JobLocation = new JobLocationDto
                                               {
                                                   JobLocationId = job.JobLocationId,
                                                   CityId = job.CityId,
                                                   Postcode = job.Postcode.Trim()
                                               },
                                               Address = new AddressDto
                                               {
                                                   AddressId = addr.AddressId,
                                                   Apartment = addr.Apartment.Trim(),
                                                   Postcode = addr.Postcode.Trim(),
                                                   City = new CityDto
                                                   {
                                                       CityId = addr.CityId,
                                                       CityName = cty.CityName.Trim(),
                                                       Province = new ProvinceDto
                                                       {
                                                           ProvinceId = prov.ProvinceId,
                                                           ProvinceName = prov.ProvinceName.Trim(),
                                                           ProvinceAbbr = prov.ProvinceAbbr.Trim(),
                                                           Country = new CountryDto
                                                           {
                                                               CountryId = contr.CountryId,
                                                               CountryName = contr.CountryName.Trim(),
                                                           }
                                                       }
                                                   }
                                               },
                                               Skills = new List<EmployeeSkillReadDto>
                                               {
                                                   new EmployeeSkillReadDto
                                                   {
                                                       EmployeeId = empSkill.EmployeeId,
                                                       SkillId = empSkill.SkillId,
                                                       EmployeeSkillId = empSkill.EmployeeSkillId,
                                                       Isactive = empSkill.Isactive,
                                                       SkillName = empSk.SkillName.Trim()
                                                   }
                                               }
                                           }).ToList();
            }
            else
            {
                empRes = (List<EmployeeDto>)(from emp in _unitOfWork.Context.Employee
                                           join depart in _unitOfWork.Context.Department on emp.DepartmentId equals depart.DepartmentId
                                           join stat in _unitOfWork.Context.Status on emp.StatusId equals stat.StatusId
                                           join job in _unitOfWork.Context.JobLocation on emp.JobLocationId equals job.JobLocationId
                                           join addr in _unitOfWork.Context.Address on emp.AddressId equals addr.AddressId
                                           join cty in _unitOfWork.Context.City on addr.CityId equals cty.CityId
                                           join prov in _unitOfWork.Context.Province on cty.ProvinceId equals prov.ProvinceId
                                           join contr in _unitOfWork.Context.Country on prov.CountryId equals contr.CountryId
                                           join rol in _unitOfWork.Context.Role on emp.RoleId equals rol.RoleId
                                           join empSkill in _unitOfWork.Context.EmployeeSkill on emp.EmployeeId equals empSkill.EmployeeId
                                           join empSk in _unitOfWork.Context.Skill on empSkill.SkillId equals empSk.SkillId
                                           select new EmployeeDto
                                           {
                                               EmployeeId = emp.EmployeeId,
                                               Bankaccount = emp.Bankaccount.Trim(),
                                               Dateofbirth = emp.Dateofbirth,
                                               Email = emp.Email.Trim(),
                                               EmployeeFirstname = emp.EmployeeFirstname.Trim(),
                                               EmployeeLastname = emp.EmployeeLastname.Trim(),
                                               Extension = emp.Extension,
                                               Hiredate = emp.Hiredate,
                                               Phone = emp.Phone.Trim(),
                                               Role = rol.RoleType.Trim(),
                                               Department = new DepartmentDto
                                               {
                                                   DepartmentId = depart.DepartmentId,
                                                   DepartmentName = depart.DepartmentName.Trim()
                                               },
                                               Status = new StatusDto
                                               {
                                                   StatusId = stat.StatusId,
                                                   StatusType = stat.StatusType.Trim(),
                                               },
                                               JobLocation = new JobLocationDto
                                               {
                                                   JobLocationId = job.JobLocationId,
                                                   Location = job.Location,
                                                   Postcode = job.Postcode.Trim(),
                                                   CityId = job.CityId
                                               },
                                               Address = new AddressDto
                                               {
                                                   AddressId = addr.AddressId,
                                                   Apartment = addr.Apartment.Trim(),
                                                   Postcode = addr.Postcode.Trim(),
                                                   City = new CityDto
                                                   {
                                                       CityId = addr.CityId,
                                                       CityName = cty.CityName.Trim(),
                                                       Province = new ProvinceDto
                                                       {
                                                           ProvinceId = prov.ProvinceId,
                                                           ProvinceName = prov.ProvinceName.Trim(),
                                                           ProvinceAbbr = prov.ProvinceAbbr.Trim(),
                                                           Country = new CountryDto
                                                           {
                                                               CountryId = contr.CountryId,
                                                               CountryName = contr.CountryName.Trim(),
                                                           }
                                                       }
                                                   }
                                               },
                                               Skills = new List<EmployeeSkillReadDto>
                                               {
                                                   new EmployeeSkillReadDto
                                                   {
                                                       EmployeeId = empSkill.EmployeeId,
                                                       SkillId = empSkill.SkillId,
                                                       EmployeeSkillId = empSkill.EmployeeSkillId,
                                                       Isactive = empSkill.Isactive,
                                                       SkillName = empSk.SkillName.Trim()
                                                   }
                                               }


                                           }).Where(x => x.EmployeeFirstname == name).ToList();
               
            }

            return empRes;
        }

        public EmployeeDto GetEmployeeById(int id)
        {
            if (id > 0)
            {
                return GetEmployee(id);
            }
            else
            {
                return null;
            }
        }

        private EmployeeDto GetEmployee(int id)
        {
            return (EmployeeDto)(from emp in _unitOfWork.Context.Employee
                                 join depart in _unitOfWork.Context.Department on emp.DepartmentId equals depart.DepartmentId
                                 join stat in _unitOfWork.Context.Status on emp.StatusId equals stat.StatusId
                                 join job in _unitOfWork.Context.JobLocation on emp.JobLocationId equals job.JobLocationId
                                 join addr in _unitOfWork.Context.Address on emp.AddressId equals addr.AddressId
                                 join cty in _unitOfWork.Context.City on addr.CityId equals cty.CityId
                                 join prov in _unitOfWork.Context.Province on cty.ProvinceId equals prov.ProvinceId
                                 join contr in _unitOfWork.Context.Country on prov.CountryId equals contr.CountryId
                                 join rol in _unitOfWork.Context.Role on emp.RoleId equals rol.RoleId
                                 join empSkill in _unitOfWork.Context.EmployeeSkill on emp.EmployeeId equals empSkill.EmployeeId
                                 join empSk in _unitOfWork.Context.Skill on empSkill.SkillId equals empSk.SkillId
                                 select new EmployeeDto
                                 {
                                     EmployeeId = emp.EmployeeId,
                                     Bankaccount = emp.Bankaccount.Trim(),
                                     Dateofbirth = emp.Dateofbirth,
                                     Email = emp.Email.Trim(),
                                     EmployeeFirstname = emp.EmployeeFirstname.Trim(),
                                     EmployeeLastname = emp.EmployeeLastname.Trim(),
                                     Extension = emp.Extension,
                                     Hiredate = emp.Hiredate,
                                     Phone = emp.Phone.Trim(),
                                     Role = rol.RoleType.Trim(),
                                     Department = new DepartmentDto
                                     {
                                         DepartmentId = depart.DepartmentId,
                                         DepartmentName = depart.DepartmentName.Trim()
                                     },
                                     Status = new StatusDto
                                     {
                                         StatusId = stat.StatusId,
                                         StatusType = stat.StatusType.Trim(),
                                     },
                                     JobLocation = new JobLocationDto
                                     {
                                         JobLocationId = job.JobLocationId,
                                         CityId = job.CityId,
                                         Postcode = job.Postcode.Trim(),
                                         Location = job.Location.Trim()
                                     },
                                     Address = new AddressDto
                                     {
                                         AddressId = addr.AddressId,
                                         Apartment = addr.Apartment.Trim(),
                                         Postcode = addr.Postcode.Trim(),
                                         City = new CityDto
                                         {
                                             CityId = addr.CityId,
                                             CityName = cty.CityName.Trim(),
                                             Province = new ProvinceDto
                                             {
                                                 ProvinceId = prov.ProvinceId,
                                                 ProvinceName = prov.ProvinceName.Trim(),
                                                 ProvinceAbbr = prov.ProvinceAbbr.Trim(),
                                                 Country = new CountryDto
                                                 {
                                                     CountryId = contr.CountryId,
                                                     CountryName = contr.CountryName.Trim(),
                                                 }
                                             }
                                         }
                                     },
                                     Skills = new List<EmployeeSkillReadDto>
                                               {
                                                   new EmployeeSkillReadDto
                                                   {
                                                       EmployeeId = empSkill.EmployeeId,
                                                       SkillId = empSkill.SkillId,
                                                       EmployeeSkillId = empSkill.EmployeeSkillId,
                                                       Isactive = empSkill.Isactive,
                                                       SkillName = empSk.SkillName.Trim()
                                                   }
                                               }


                                 }).Where(x => x.EmployeeId == id).FirstOrDefault();
        }

        public List<EmployeeDto> GetEmployeeByFirstName(string name)
        {
            if (!string.IsNullOrWhiteSpace(name))
            {
                return GetEmployeesList(name);
            }
            else
            {
                return null;
            }
            //List<Employee> employee = _unitOfWork.Context.Employee.Where(x => x.EmployeeFirstname == name).ToList();
            //var emp = _mapper.Map<List<Employee>, List<EmployeeDto>>(employee);
            //return emp;
        }

        public bool UpdateEmployee(EmployeeAddDto employee)
        {
            bool isSuccess = false;
            try
            {
                if (employee != null)
                {
                    Address address = new Address
                    {
                        AddressId = employee.Address.AddressId,
                        Apartment = employee.Address.Apartment,
                        Postcode = employee.Address.Postcode,
                        CityId = employee.Address.City.CityId
                    };

                    _unitOfWork.Repository<Address>().Update(address);
                    //_unitOfWork.SaveChanges();
                    if (address.AddressId > 0)
                    {
                        var empUpdate = _mapper.Map<EmployeeAddDto, Employee>(employee);
                        empUpdate.AddressId = address.AddressId;
                        _unitOfWork.Context.Update(empUpdate);
                        //_unitOfWork.SaveChanges();
                    }

                    EmployeeSkill employeeSkill = new EmployeeSkill
                    {
                        EmployeeSkillId = employee.EmployeeSkill.EmployeeSkillId,
                        EmployeeId = employee.EmployeeId,
                        Isactive = employee.EmployeeSkill.Isactive,
                        SkillId = employee.EmployeeSkill.SkillId
                    };

                    _unitOfWork.Repository<EmployeeSkill>().Update(employeeSkill);
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
