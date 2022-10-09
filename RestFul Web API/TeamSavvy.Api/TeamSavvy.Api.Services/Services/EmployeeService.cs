using AutoMapper;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using TeamSavvy.Api.BusinessModel.DataTransferModel;
using TeamSavvy.Api.Entities.Context;
using TeamSavvy.Api.Entities.GenericRepo;
using TeamSavvy.Api.Services.IServices;
using TeamSavvy.Api.Web.Models;

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
                    var roleId = _unitOfWork.Context.Role
                                 .Where(x => x.RoleType == employee.Role)
                                 .FirstOrDefault()
                                 .RoleId;

                    var deptId = _unitOfWork.Context.Department
                                .Where(x => x.DepartmentName == employee.Department.DepartmentName)
                                .Select(x=>x.DepartmentId)
                                .FirstOrDefault();

                    var statusId = _unitOfWork.Context.Status
                                   .Where(x => x.StatusType == employee.Status.StatusType)
                                   .Select(x => x.StatusId)
                                   .FirstOrDefault();
                    var jobLocId = _unitOfWork.Context.JobLocation
                                  .Where(x => x.JobLocationName == employee.JobLocation.JobLocationName)
                                  .Select(x => x.JobLocationId)
                                  .FirstOrDefault();

                    if(roleId > 0 && deptId > 0 && statusId > 0 && jobLocId > 0)
                    {

                        Address address = new Address
                        {
                            Apartment = employee.Address.Apartment,
                            CityId = employee.Address.City.CityId,
                            Postcode = employee.Address.Postcode,
                        };
                        _unitOfWork.Context.Add(address);
                        _unitOfWork.Repository<Address>().Insert(address);
                        _unitOfWork.SaveChanges();
                                     
                        Employee emp = new Employee
                        {
                            RoleId = roleId,
                            EmployeeFirstname = employee.EmployeeFirstname,
                            EmployeeLastname = employee.EmployeeLastname,
                            Dateofbirth = employee.Dateofbirth,
                            Hiredate = employee.Hiredate,
                            Phone = employee.Phone,
                            Email = employee.Email,
                            Bankaccount = employee.Bankaccount,
                            DepartmentId = deptId,
                            StatusId = statusId,
                            JobLocationId = jobLocId,
                            AddressId = address.AddressId
                        };

                        _unitOfWork.Context.Add(address);
                        _unitOfWork.Repository<Employee>().Insert(emp);
                        _unitOfWork.SaveChanges();
                        if(emp.EmployeeId > 0)
                        {
                            isSuccess = true;
                        }
                    }
                }
            }
            catch(Exception e)
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
            if (name == null || string.IsNullOrWhiteSpace(name))
            {
                return (List<EmployeeDto>)(from emp in _unitOfWork.Context.Employee
                                           join depart in _unitOfWork.Context.Department on emp.DepartmentId equals depart.DepartmentId
                                           join stat in _unitOfWork.Context.Status on emp.StatusId equals stat.StatusId
                                           join job in _unitOfWork.Context.JobLocation on emp.JobLocationId equals job.JobLocationId
                                           join addr in _unitOfWork.Context.Address on emp.AddressId equals addr.AddressId
                                           join cty in _unitOfWork.Context.City on addr.CityId equals cty.CityId
                                           join prov in _unitOfWork.Context.Province on cty.ProvinceId equals prov.ProvinceId
                                           join contr in _unitOfWork.Context.Country on prov.CountryId equals contr.CountryId
                                           join rol in _unitOfWork.Context.Role on emp.RoleId equals rol.RoleId
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
                                                   JobLocationAddressId = job.JobLocationAddressId,
                                                   JobLocationName = job.JobLocationName.Trim()
                                               },
                                               Address = new AddressDto
                                               {
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
                                               }


                                           }).ToList();
            }
            else
            {
                return (List<EmployeeDto>)(from emp in _unitOfWork.Context.Employee
                                     join depart in _unitOfWork.Context.Department on emp.DepartmentId equals depart.DepartmentId
                                     join stat in _unitOfWork.Context.Status on emp.StatusId equals stat.StatusId
                                     join job in _unitOfWork.Context.JobLocation on emp.JobLocationId equals job.JobLocationId
                                     join addr in _unitOfWork.Context.Address on emp.AddressId equals addr.AddressId
                                     join cty in _unitOfWork.Context.City on addr.CityId equals cty.CityId
                                     join prov in _unitOfWork.Context.Province on cty.ProvinceId equals prov.ProvinceId
                                     join contr in _unitOfWork.Context.Country on prov.CountryId equals contr.CountryId
                                     join rol in _unitOfWork.Context.Role on emp.RoleId equals rol.RoleId
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
                                             JobLocationAddressId = job.JobLocationAddressId,
                                             JobLocationName = job.JobLocationName.Trim()
                                         },
                                         Address = new AddressDto
                                         {
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
                                         }


                                     }).Where(x => x.EmployeeFirstname == name).ToList();
            }
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
                                         JobLocationAddressId = job.JobLocationAddressId,
                                         JobLocationName = job.JobLocationName.Trim()
                                     },
                                     Address = new AddressDto
                                     {
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
                                     }


                                 }).Where(x => x.EmployeeId == id).FirstOrDefault();
        }

        public List<EmployeeDto> GetEmployeeByFirstName(string name)
        {
            if(!string.IsNullOrWhiteSpace(name))
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

        public bool UpdateEmployee(EmployeeDto employee)
        {
            bool isSuccess = false;
            try
            {
                if(employee != null)
                {
                    var empUpdate = _mapper.Map<EmployeeDto, Employee>(employee);
                    _unitOfWork.Context.Update(empUpdate);
                    _unitOfWork.SaveChanges();
                    isSuccess = true;
                }
            }
            catch(Exception e)
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
