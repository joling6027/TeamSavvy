﻿using AutoMapper;
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
                    var IsExist = _unitOfWork.Context.Employee.Where(e => e.EmployeeId == timeSheet.EmployeeId).Any();
                    if(IsExist)
                    {
                        var attendence = _mapper.Map<TimeSheetDto, TimeSheet>(timeSheet);
                        _unitOfWork.Repository<TimeSheet>().Insert(attendence);
                        _unitOfWork.SaveChanges();
                        isSuccess = true;
                    }
                    else
                    {
                        isSuccess = false;
                    }
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
            List<TimeSheetDto> empTimeSheet = new List<TimeSheetDto>();
            int reducedTime = 0;
            int totalWork = 0;
            try
            {
                if (employeeId > 0)
                {
                    var timeSheet = _unitOfWork.Context.TimeSheet
                                    .Where(x => x.EmployeeId == employeeId)
                                    .ToList();
                    var date = string.Empty;
                    foreach (var ts in timeSheet)
                    {
                       
                        if(date != ts.ClockDate)
                        {
                            date = ts.ClockDate;
                            var firstClockIn = _mapper.Map<TimeSheet, TimeSheetDto>(ts);
                            var lco = timeSheet
                                           .Where(x => x.EmployeeId == employeeId && x.ClockDate == ts.ClockDate && x.ClockType == "Clock-Out").OrderByDescending(x => x.TimesheetId)
                                           .FirstOrDefault();
                            var lastCLockOut = _mapper.Map<TimeSheet, TimeSheetDto>(lco);
                            if(firstClockIn != null)
                            empTimeSheet.Add(firstClockIn);
                            if (lco != null)
                            empTimeSheet.Add(lastCLockOut);
                        }
                       
                    }
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
                                    .OrderByDescending(x => x.TimesheetId)
                                    .Where(x => x.EmployeeId == employeeId)
                                    .Select(x => x.ClockType).FirstOrDefault();
                    if(clockType != null)
                    {
                        if(clockType == "Clock-In")
                        {
                            clockType = "ClockOut";
                        }
                        else
                        {
                            clockType = "ClockIn";
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
