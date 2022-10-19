using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using TeamSavvy.Api.BusinessModel.DataTransferModel;
using TeamSavvy.Api.Entities.Context;
using TeamSavvy.Api.Entities.GenericRepo;
using TeamSavvy.Api.Services.IServices;
using TeamSavvy.Api.Utilities.Helper;
using TeamSavvy.Api.Entities.Models;

namespace TeamSavvy.Api.Services.Services
{
    public class TimeSheetService : ITimeSheetService
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
        public TimeSheetService(GenericUnitOfWork<TeamSavvyContext> unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        #endregion


        public bool AddAttendence(TimeSheetDto timeSheet)
        {
            bool isSuccess = false;
            try
            {
                if(timeSheet != null)
                {
                    var attendence = _mapper.Map<TimeSheetDto, TimeSheet>(timeSheet);
                    _unitOfWork.Repository<TimeSheet>().Insert(attendence);
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

        public List<TimeSheetDto> GetTimeSheet(int employeeId)
        {
            List<TimeSheetDto> empTimeSheet = null;
            try
            {
                if (employeeId > 0)
                {
                    var timeSheet = _unitOfWork.Context.TimeSheet
                                    .Where(x => x.EmployeeId == employeeId)
                                    .ToList();
                    empTimeSheet = _mapper.Map<List<TimeSheet>, List<TimeSheetDto>>(timeSheet);
                }
            }
            catch (Exception e)
            {
                empTimeSheet = null;
            }
            return empTimeSheet;
        }

        public string GetTimeSheetMobile(int employeeId)
        {
            string clockType = string.Empty;
            try
            {
                if (employeeId > 0)
                {
                    clockType = _unitOfWork.Context.TimeSheet
                                    .OrderByDescending(x => x.ClockTime)
                                    .Where(x => x.EmployeeId == employeeId)
                                    .Select(x => x.ClockType).FirstOrDefault();
                    if(clockType != null)
                    {
                        if(clockType == ClockType.ClockIn.ToString())
                        {
                            clockType = ClockType.ClockOut.ToString();
                        }
                        else
                        {
                            clockType = ClockType.ClockIn.ToString();
                        }
                    }
                }
            }
            catch (Exception e)
            {
                clockType = string.Empty;
            }

            return clockType;

        }
    }
}
