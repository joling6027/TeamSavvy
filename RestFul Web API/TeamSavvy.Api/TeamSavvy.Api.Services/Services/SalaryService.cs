using AutoMapper;
using Org.BouncyCastle.Utilities;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using TeamSavvy.Api.BusinessModel.DataTransferModel;
using TeamSavvy.Api.Entities.Context;
using TeamSavvy.Api.Entities.GenericRepo;
using TeamSavvy.Api.Entities.Models;
using TeamSavvy.Api.Services.IServices;

namespace TeamSavvy.Api.Services.Services
{
    public class SalaryService : ISalaryService
    {
        #region Private Member Variables
        /// <summary>
        /// Initialise generic data context variable.
        /// </summary>
        private readonly GenericUnitOfWork<TeamSavvyContext> _unitOfWork;
        private readonly IMapper _mapper;
        #endregion

        #region constructor
        public SalaryService(GenericUnitOfWork<TeamSavvyContext> unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        #endregion

        public bool AddSalary(SalaryDto salary)
        {
            bool isSuccess = false;
            try
            {
                if (salary != null)
                {
                    var sal = _mapper.Map<Salary>(salary);
                    if (sal != null)
                    {
                        _unitOfWork.Repository<Salary>().Insert(sal);
                        _unitOfWork.SaveChanges();
                        if(sal.SalaryId > 0)
                        {
                            var payRoll = new Payroll
                            {
                                SalaryId = sal.SalaryId,
                                EmployeeId = sal.EmployeeId,
                                Netpay = (Int16.Parse(salary.Employeesalary) * 12).ToString(),
                                Deduction = "0",
                                PaySick = "100",
                                PayVacation = "100",
                                PayYtd = salary.Employeesalary,
                                PayType = "Monthly",
                                Earning = salary.Employeesalary,
                                TotalHours = 160,
                                Totalworkingdays = 20,
                                PayDate = DateTime.Now.Date.ToString("yyyy-mm-dd"),
                            };

                            _unitOfWork.Repository<Payroll>().Insert(payRoll);
                            _unitOfWork.SaveChanges();
                        }
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

        public bool DeleteSalary(int id)
        {
            bool isSuccess = false;
            try
            {
                if (id > 0)
                {
                    var salary = _unitOfWork.Context.Salary.Where(x => x.SalaryId == id).FirstOrDefault();
                    if (salary != null)
                    {
                        var sal = _mapper.Map<Salary>(salary);
                        if (sal != null)
                        {
                            _unitOfWork.Repository<Salary>().Delete(sal);
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

        public SalaryDto GetSalaryByEmployeeId(int employeeId)
        {
            SalaryDto salaryDto = null;
            try
            {
                var salary = _unitOfWork.Context.Salary.Where(x => x.EmployeeId == employeeId).FirstOrDefault();
                if (salary != null)
                {
                    salaryDto = _mapper.Map<SalaryDto>(salary);
                }
            }
            catch (Exception e)
            {
                salaryDto = null;
            }

            return salaryDto;
        }

        public SalaryDto GetSalaryBySalaryId(int salaryId)
        {
            SalaryDto salaryDto = null;
            try
            {
                var salary = _unitOfWork.Context.Salary.Where(x => x.SalaryId == salaryId).FirstOrDefault();
                if (salary != null)
                {
                    salaryDto = _mapper.Map<SalaryDto>(salary);
                }
            }
            catch (Exception e)
            {
                salaryDto = null;
            }

            return salaryDto;
        }
    }
}
