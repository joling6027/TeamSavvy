using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TeamSavvy.Api.BusinessModel.DataTransferModel;
using TeamSavvy.Api.Entities.Context;
using TeamSavvy.Api.Entities.GenericRepo;
using TeamSavvy.Api.Services.IServices;
using TeamSavvy.Api.Entities.Models;

namespace TeamSavvy.Api.Services.Services
{
    public class PayRollService : IPayRollService
    {
        #region Private Member Variables
        /// <summary>
        /// Initialise generic data context variable.
        /// </summary>
        private readonly GenericUnitOfWork<TeamSavvyContext> _unitOfWork;
        private readonly IMapper _mapper;
        #endregion

        #region constructor
        public PayRollService(GenericUnitOfWork<TeamSavvyContext> unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        #endregion

        public bool AddPayroll(PayrollDto payroll)
        {
            bool isSuccess = false;
            try
            {
                if (payroll != null)
                {
                    var payrol = _mapper.Map<Payroll>(payroll);
                    if (payrol != null)
                    {
                        _unitOfWork.Repository<Payroll>().Insert(payrol);
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

        public bool DeletePayroll(int id)
        {
            bool isSuccess = false;
            try
            {
                if (id > 0)
                {
                    var payroll = _unitOfWork.Context.Payroll.Where(x => x.PayrollId == id).FirstOrDefault();
                    if(payroll != null)
                    {
                        var payrol = _mapper.Map<Payroll>(payroll);
                        if (payrol != null)
                        {
                            _unitOfWork.Repository<Payroll>().Delete(payrol);
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

        public List<PayrollDto> GetPayrollsByEmployeeId(int employeeId)
        {
            List<PayrollDto> payrolls = null;
            try
            {
                var payrol = _unitOfWork.Context.Payroll.Where(x=>x.EmployeeId == employeeId).ToList();
                if (payrol.Any())
                {
                    payrolls = _mapper.Map<List<PayrollDto>>(payrol);
                }
            }
            catch(Exception e)
            {
                payrolls = null;
            }

            return payrolls;
        }

        public PayrollDto GetPayrollById(int payrollId)
        {
            PayrollDto payroll = null;
            try
            {
                var payrol = _unitOfWork.Context.Payroll.Where(x => x.PayrollId == payrollId).FirstOrDefault();
                if (payrol != null)
                {
                    payroll = _mapper.Map<PayrollDto>(payrol);
                }
            }
            catch (Exception e)
            {
                payroll = null;
            }

            return payroll;
        }

        public List<PayrollDto> GetPayrolls()
        {
            List<PayrollDto> payrolls = null;
            try
            {
                var payrol = _unitOfWork.Context.Payroll.ToList();
                if (payrol.Any())
                {
                    payrolls = _mapper.Map<List<PayrollDto>>(payrol);
                }
            }
            catch (Exception e)
            {
                payrolls = null;
            }

            return payrolls;
        }

        public PayrollDto GetPayrollByEmployeeId(int employeeId)
        {
            PayrollDto payroll = null;
            try
            {
                var payrol = _unitOfWork.Context.Payroll.Where(x => x.EmployeeId == employeeId).FirstOrDefault();
                if (payrol != null)
                {
                    payroll = _mapper.Map<PayrollDto>(payrol);
                }
            }
            catch (Exception e)
            {
                payroll = null;
            }

            return payroll;
        }

        public bool UpdatePayroll(PayrollDto payroll)
        {
            bool isSuccess = false;
            try
            {
                if (payroll != null)
                {
                    var payrol = _mapper.Map<Payroll>(payroll);
                    if (payrol != null)
                    {
                        _unitOfWork.Repository<Payroll>().Update(payrol);
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
