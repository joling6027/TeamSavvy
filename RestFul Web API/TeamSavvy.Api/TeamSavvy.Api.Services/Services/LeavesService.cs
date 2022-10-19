using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TeamSavvy.Api.BusinessModel.DataTransferModel;
using TeamSavvy.Api.Entities.Context;
using TeamSavvy.Api.Entities.GenericRepo;
using TeamSavvy.Api.Entities.Models;
using TeamSavvy.Api.Services.IServices;

namespace TeamSavvy.Api.Services.Services
{
    public class LeavesService : ILeavesService
    {
        #region Private Member Variables
        /// <summary>
        /// Initialise generic data context variable.
        /// </summary>
        private readonly GenericUnitOfWork<TeamSavvyContext> _unitOfWork;
        private readonly IMapper _mapper;
        #endregion

        #region constructor
        public LeavesService(GenericUnitOfWork<TeamSavvyContext> unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        #endregion
        public bool AddLeave(EmployeeLeaveDto leave)
        {
            bool isSuccess = false;
            try
            {
                if (leave != null)
                {
                    var empLeave = _mapper.Map<EmployeeLeave>(leave);
                    if (empLeave != null)
                    {
                        _unitOfWork.Repository<EmployeeLeave>().Insert(empLeave);
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

        public bool DeleteLeave(int leaveId)
        {
            bool isSuccess = false;
            try
            {
                if (leaveId > 0)
                {
                    var leave = _unitOfWork.Context.EmployeeLeave.Where(x => x.EmployeeLeaveId == leaveId).FirstOrDefault();
                    if (leave != null)
                    {
                        var empLeave = _mapper.Map<EmployeeLeave>(leave);
                        if (empLeave != null)
                        {
                            _unitOfWork.Repository<EmployeeLeave>().Delete(empLeave);
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

        public EmployeeLeaveDto GetLeaveById(int leaveId)
        {
            EmployeeLeaveDto empLeave = null;
            try
            {
                var leave = _unitOfWork.Context.EmployeeLeave.Where(x => x.EmployeeLeaveId == leaveId).FirstOrDefault();
                if (empLeave != null)
                {
                    empLeave = _mapper.Map<EmployeeLeaveDto>(leave);
                }
            }
            catch (Exception e)
            {
                empLeave = null;
            }

            return empLeave;
        }

        public List<EmployeeLeaveDto> GetLeavesByEmployeeId(int employeeId)
        {

            List<EmployeeLeaveDto> leaves = null;
            try
            {
                var empLeaves = _unitOfWork.Context.EmployeeLeave.Where(x => x.EmployeeId == employeeId).ToList();
                if (leaves.Any())
                {
                    leaves = _mapper.Map<List<EmployeeLeaveDto>>(empLeaves);
                }
            }
            catch (Exception e)
            {
                leaves = null;
            }

            return leaves;
        }

        public bool UpdateLeave(EmployeeLeaveDto leave)
        {
            bool isSuccess = false;
            try
            {
                if (leave != null)
                {
                    var empLeave = _mapper.Map<EmployeeLeave>(leave);
                    if (empLeave != null)
                    {
                        _unitOfWork.Repository<EmployeeLeave>().Update(empLeave);
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
