﻿using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TeamSavvy.Api.BusinessModel.DataTransferModel;
using TeamSavvy.Api.BusinessModel.DataTransferModel.DropdownDtos;
using TeamSavvy.Api.Entities.Context;
using TeamSavvy.Api.Entities.GenericRepo;
using TeamSavvy.Api.Services.IServices;

namespace TeamSavvy.Api.Services.Services
{
    public class DropdownsService : IDropdownsService
    {
        #region Private Member Variables
        /// <summary>
        /// Initialise generic data context variable.
        /// </summary>
        private readonly GenericUnitOfWork<TeamSavvyContext> _unitOfWork;
        private readonly IMapper _mapper;
        #endregion

        #region Constructors

        /// <summary>
        /// Initializes the dependencies of services
        /// </summary>
        /// <param name="unitOfWork">unit of work for repository</param>
        public DropdownsService(GenericUnitOfWork<TeamSavvyContext> unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        #endregion
        public List<CountryDdl> GetCountryProvCity()
        {
            List<CountryDdl> counProvCityDdl = new List<CountryDdl>();
            try
            {
                var countries = _unitOfWork.Context.Country.ToList();
                var provinces = _unitOfWork.Context.Province.ToList();
                var cities = _unitOfWork.Context.City.ToList();

                foreach (var country in countries)
                {
                    CountryDdl countryDdl = new CountryDdl
                    {
                        CountryId = country.CountryId,
                        CountryName = country.CountryName,
                        Provinces = provinces.Where(x => x.CountryId == country.CountryId).Select(x => new ProvinceDdl
                        {
                            ProvinceId = x.ProvinceId,
                            ProvinceName = x.ProvinceName,
                            ProvinceAbbr = x.ProvinceAbbr,
                            Cities = cities.Where(a => a.ProvinceId == x.ProvinceId).Select(z => new CityDdl
                            {
                                CityId = z.CityId,
                                CityName = z.CityName,
                            }).ToList()
                        }).ToList()
                    };

                    counProvCityDdl.Add(countryDdl);

                }
            }
            catch (Exception e)
            {
                counProvCityDdl = null;
            }
            return counProvCityDdl;
        }

        public List<DepartmentDto> GetDepartments()
        {
            List<DepartmentDto> departments = null;
            try
            {
                var depart = _unitOfWork.Context.Department.ToList();
                if (depart.Any())
                {
                    departments = _mapper.Map<List<DepartmentDto>>(depart);
                }

            }
            catch (Exception ex)
            {
                departments = null;
            }

            return departments;
        }


        public List<RoleDto> GetRoles()
        {
            List<RoleDto> roles = null;
            try
            {
                var rl = _unitOfWork.Context.Role.ToList();
                if (rl.Any())
                {
                    roles = _mapper.Map<List<RoleDto>>(rl);
                }

            }
            catch (Exception ex)
            {
                roles = null;
            }

            return roles;
        }

        public List<CompanyLocations> GetCompanyLocations()
        {

            List<CompanyLocations> companies = null;
            try
            {
                var locations = _unitOfWork.Context.JobLocation.ToList();
                if (locations.Any())
                {
                    companies = new List<CompanyLocations>();
                    foreach (var location in locations)
                    {
                        companies.Add(new CompanyLocations
                        {
                            JobLocationId = location.JobLocationId,
                            Location = location.Location,
                        });
                    }
                }

            }
            catch (Exception ex)
            {
                companies = null;
            }

            return companies;
        }

        public List<SkillDto> GetSkills()
        {
            List<SkillDto> skills = null;
            try
            {
                var sk = _unitOfWork.Context.Skill.ToList();
                if(sk.Any())
                {
                    skills = _mapper.Map<List<SkillDto>>(sk);
                }

            }
            catch(Exception ex)
            {
                skills = null;
            }

            return skills;
        }

        public List<LeaveDto> GetLeavesType()
        {
            List<LeaveDto> leaveDtos = new List<LeaveDto>();
            try
            {
                var leaveType = _unitOfWork.Context.Leave.ToList();
                if(leaveType.Any())
                {
                    leaveDtos = _mapper.Map<List<LeaveDto>>(leaveType);
                }
            }
            catch(Exception ex)
            {
                leaveDtos = null;
            }

            return leaveDtos;
        }
    }
}
