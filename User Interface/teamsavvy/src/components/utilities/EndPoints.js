const enpoints = {
  login:'auth/login',
  employee:'Employee',
  dropdownCont: 'Dropdowns/countyProvinceCity',
  dropdownSkills:'Dropdowns/skills',
  payrollList: 'Payroll/list/employeeId',
  paystub: 'Payroll/payrollId',
  employeeTask: 'EmployeeTask/employeeId',
  updateTask: 'EmployeeTask/updateTask',
  internalJob: 'Job',
  teams:'Teams',
  addEmployee: 'Employee/addEmployee',
  updateEmployee: 'Employee/updateEmployee',
  resignation:'Email/resign',
  deleteEmployee:'Employee/deleteEmployee',
  changePassword:'Employee/changepassword',
  dropdownRoles :'Dropdowns/roles',
  dropdownDepartments:'Dropdowns/departments',
  dropdownCompanies:'Dropdowns/companylocations',
  projects:'Projects',
  addSalary:'Salary/addSalary',
  addEmployeeOnProject:'Projects/addEmployeeOnProject',

}

export function GetEndPoints(){
  return enpoints;
}