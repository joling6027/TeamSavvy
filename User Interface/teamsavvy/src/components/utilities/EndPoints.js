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
  projectsByEmployeeId:'Projects/employeeId',
  addSalary:'Salary/addSalary',
  addEmployeeOnProject:'Projects/addEmployeeOnProject',
  otp:'Email/otp',
  changePassword:'Employee/changepassword',
  dropdownRoles :'Dropdowns/roles',
  dropdownDepartments:'Dropdowns/departments',
  dropdownCompanies:'Dropdowns/companylocations',
  projects:'Projects',
  taskListByManagerId: 'EmployeeTask/tasklist',
  teamMembers:'Dashboard/teammemberscount',
  getTeamMembers:'Dashboard/teammembers',
  projectsForHR:'Dashboard/projects',
  job:'Job',
}

export function GetEndPoints(){
  return enpoints;
}