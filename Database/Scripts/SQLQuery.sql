
/*Gives the count of Number of employees working on a project.*/
SELECT COUNT(EMPLOYEE_ID) AS Result  FROM Employee_Project
WHERE PROJECT_ID=11;

/*Give the count of projects assigned to an employee.*/
SELECT COUNT(EMPLOYEE_ID) AS Result   FROM Employee_Project
WHERE EMPLOYEE_ID=9;

/*Give count of project based on max budget*/
SELECT COUNT(PROJECT_ID) AS Result  FROM Project
WHERE PROJECT_BUDGET= 55000;

/* Give count of projjects with > condition*/
SELECT COUNT (*) AS Result  FROM Project
WHERE PROJECT_BUDGET > 15000;

/* Gives the count of employees of a [articular age group */
SELECT COUNT (Employee_ID) AS Result  FROM  Employee
WHERE DATEOFBIRTH > '1995-10-09';


/* Employee that has skill Android*/
SELECT COUNT (Employee_ID) AS Result  FROM  Employee_Skill
WHERE SKILL_ID= 5;

/* Count of employees that took leaves*/
SELECT COUNT(Employee_ID) AS Result  FROM Employee_Leave
WHERE EMPLOYEE_LEAVE_ID= 2;


/* Count of employees whose leave got rejected */
SELECT COUNT(Employee_ID) AS Result  FROM Employee_Leave
WHERE LEAVE_STATUS = 'IS_REJECTED';

/* Employees who shares the same bank*/
SELECT COUNT(EMPLOYEE_ID) AS Result   FROM Employee
WHERE BANKCODE = 11005;

/*Give count of projects that a manager is working on */
SELECT COUNT(PROJECT_ID) AS Result  FROM Project
WHERE PROJECT_MANAGER_ID= 8;

/* No. of employees working on a project*/
SELECT PROJECT_TOTAL_EMPLOYEES  FROM Project
WHERE PROJECT_ID= 2;

/* No. of Tasks assigned to a project*/
SELECT TOTAL_TASK_COUNT  FROM Project
WHERE PROJECT_ID= 10;

/* No. of Tasks completed in a project*/
SELECT TOTAL_COMPLETED_COUNT  FROM Project
WHERE PROJECT_ID= 10;
