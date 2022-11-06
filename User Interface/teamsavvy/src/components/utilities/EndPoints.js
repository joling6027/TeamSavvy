const enpoints = {
  login:'auth/login',
  employee:'Employee',
  dropdown: 'Dropdowns/countyProvinceCity',
  payrollList: 'Payroll/list/employeeId',
  paystub: 'Payroll/payrollId',
  employeeTask: 'EmployeeTask/employeeId',
  updateTask: 'EmployeeTask/updateTask',
  internalJob: 'Job'
}

export function GetEndPoints(){
  return enpoints;
}