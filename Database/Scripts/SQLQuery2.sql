/*
/* To get Leave type id  */
select concat_ws(' ',EMPLOYEE_FIRSTNAME, EMPLOYEE_LASTNAME) as complete_name
from employee
where EMPLOYEE_ID not in
(
  select EMPLOYEE_ID
  from Employee_Leave
  where LEAVE_TYPE_ID =  1
);

-- join query combining the table of employee and skill to show the nessecary details. 

SELECT Emp.Employee_ID,Emp.EMPLOYEE_FIRSTNAME, Emp.DateOfBirth, Emp.Phone,    -- 5 
Skill.SKILL_ID 
FROM Employee AS Emp
JOIN SKILL AS Skill
ON Emp.EMPLOYEE_ID=Skill.SKILL_ID;

-- joining two table student_name and Appointments to check the appointment of the student and which professor is allocated to that student.
  
SELECT Emp.Employee_ID, Emp.EMPLOYEE_FIRSTNAME, Emp.EMPLOYEE_LASTNAME,  -- 6  
EmpP.PROJECT_ID,EmpP.STATUS
FROM Employee AS Emp
JOIN Employee_Project AS EmpP
ON Emp.EMPLOYEE_ID = EmpP.EMPLOYEE_ID ;


SELECT Emp.Employee_ID,  Emp.EMPLOYEE_FIRSTNAME,
TimeSheet.CLOCK_DATE,TimeSheet.CLOCK_TIME,CLOCK_TYPE
FROM Employee AS Emp
LEFT JOIN TimeSheet 
ON Emp.Employee_ID=TimeSheet.EMPLOYEE_ID
ORDER BY TimeSheet.TIMESHEET_ID;
*/



/*
Select Emp.EMPLOYEE_FIRSTNAME, Project.PROJECT_NAME
From Employee AS Emp
LEFT JOIN Project AS Project
ON Emp.Project_ID = Project.  */

/*
SELECT Emp.EMPLOYEE_FIRSTNAME,
Empskill.ISACTIVE
FROM Employee_Skill AS Empskill
LEFT JOIN Employee AS Emp
ON Emp.EMPLOYEE_ID = Empskill.EMPLOYEE_ID
UNION ALL
SELECT Empskill.SKILL_ID, skill.SKILL_NAME
FROM Employee_Skill AS Empskill
RIGHT JOIN Skill AS skill
ON Empskill.SKILL_ID =skill.SKILL_ID; */








/* Department and Employee*/

Select Dept.Department_NAME, Emp.EMPLOYEE_FIRSTNAME
From Department AS Dept
LEFT JOIN Employee AS Emp
ON Dept.Department_ID = Emp.DEPARTMENT_ID;


SELECT Dept.Department_NAME, Emp.EMPLOYEE_FIRSTNAME
    FROM Employee Emp
    JOIN Department  Dept ON Dept.Department_ID = Emp.DEPARTMENT_ID
	WHERE Dept.Department_Name = 'Marketing'

SELECT Dept.Department_NAME, Emp.EMPLOYEE_FIRSTNAME
    FROM Employee Emp
    JOIN Department  Dept ON Dept.Department_ID = Emp.DEPARTMENT_ID
	WHERE Dept.Department_Name = 'Information Technology'

SELECT Dept.Department_NAME, Emp.EMPLOYEE_FIRSTNAME
    FROM Employee Emp
    JOIN Department  Dept ON Dept.Department_ID = Emp.DEPARTMENT_ID
	WHERE Dept.Department_Name = 'Finance'


SELECT Dept.Department_NAME, Emp.EMPLOYEE_FIRSTNAME
    FROM Employee Emp
    JOIN Department  Dept ON Dept.Department_ID = Emp.DEPARTMENT_ID
	WHERE Dept.Department_Name = 'Sales'

/* Department and Project */




/* Employee and Skill*/
SELECT Emp.EMPLOYEE_FIRSTNAME,skill.SKILL_ID, skill.SKILL_NAME
    FROM Employee Emp
    JOIN Employee_Skill EmpSkill ON EmpSkill.EMPLOYEE_ID = Emp.EMPLOYEE_ID
    JOIN Skill skill ON skill.SKILL_ID = EmpSkill.SKILL_ID
	AND skill.SKILL_NAME IN ('C#')
	--where Emp.EMPLOYEE_ID IN (1,2)

Select distinct(skill.SKILL_NAME)
FROM Employee Emp
    JOIN Employee_Skill EmpSkill ON EmpSkill.EMPLOYEE_ID = Emp.EMPLOYEE_ID
    JOIN Skill skill ON skill.SKILL_ID = EmpSkill.SKILL_ID
	where Emp.EMPLOYEE_ID IN (1,2)

SELECT Emp.EMPLOYEE_FIRSTNAME,skill.SKILL_ID, skill.SKILL_NAME
    FROM Employee Emp
    JOIN Employee_Skill EmpSkill ON EmpSkill.EMPLOYEE_ID = Emp.EMPLOYEE_ID
    JOIN Skill skill ON skill.SKILL_ID = EmpSkill.SKILL_ID
	AND skill.SKILL_NAME IN ('Python')

SELECT Emp.EMPLOYEE_FIRSTNAME,skill.SKILL_ID, skill.SKILL_NAME
    FROM Employee Emp
    JOIN Employee_Skill EmpSkill ON EmpSkill.EMPLOYEE_ID = Emp.EMPLOYEE_ID
    JOIN Skill skill ON skill.SKILL_ID = EmpSkill.SKILL_ID
	AND skill.SKILL_NAME IN ('Machine Learning')


SELECT Emp.EMPLOYEE_FIRSTNAME,skill.SKILL_ID, skill.SKILL_NAME
    FROM Employee Emp
    JOIN Employee_Skill EmpSkill ON EmpSkill.EMPLOYEE_ID = Emp.EMPLOYEE_ID
    JOIN Skill skill ON skill.SKILL_ID = EmpSkill.SKILL_ID
	AND skill.SKILL_NAME IN ('React')

SELECT Emp.EMPLOYEE_FIRSTNAME,skill.SKILL_ID, skill.SKILL_NAME
    FROM Employee Emp
    JOIN Employee_Skill EmpSkill ON EmpSkill.EMPLOYEE_ID = Emp.EMPLOYEE_ID
    JOIN Skill skill ON skill.SKILL_ID = EmpSkill.SKILL_ID
	AND skill.SKILL_ID IN (2,4)
/* For Employee and corressponding projects */

SELECT Emp.EMPLOYEE_FIRSTNAME
    FROM Employee Emp
    JOIN Employee_Project EmpProject ON EmpProject.EMPLOYEE_ID = Emp.EMPLOYEE_ID
    JOIN Project project ON project.PROJECT_ID = EmpProject.PROJECT_ID
	AND Project.PROJECT_NAME IN ('Library App')

SELECT Emp.EMPLOYEE_FIRSTNAME
    FROM Employee Emp
    JOIN Employee_Project EmpProject ON EmpProject.EMPLOYEE_ID = Emp.EMPLOYEE_ID
    JOIN Project project ON project.PROJECT_ID = EmpProject.PROJECT_ID
	AND Project.PROJECT_NAME IN ('Statistical Analysis')

SELECT Emp.EMPLOYEE_FIRSTNAME
    FROM Employee Emp
    JOIN Employee_Project EmpProject ON EmpProject.EMPLOYEE_ID = Emp.EMPLOYEE_ID
    JOIN Project project ON project.PROJECT_ID = EmpProject.PROJECT_ID
	AND Project.PROJECT_NAME IN ('Weather Forecasting')



/* For Employee and Leaves */
SELECT Emp.EMPLOYEE_FIRSTNAME
    FROM Employee Emp
    JOIN Employee_Leave EmpLeave ON EmpLeave.EMPLOYEE_ID = Emp.EMPLOYEE_ID
    JOIN Leave leave ON leave.LEAVE_TYPE_ID = EmpLeave.LEAVE_TYPE_ID
	AND leave.LEAVE_TYPE_ID IN (1)

SELECT Emp.EMPLOYEE_FIRSTNAME
    FROM Employee Emp
    JOIN Employee_Leave EmpLeave ON EmpLeave.EMPLOYEE_ID = Emp.EMPLOYEE_ID
    JOIN Leave leave ON leave.LEAVE_TYPE_ID = EmpLeave.LEAVE_TYPE_ID
	AND leave.LEAVE_TYPE_ID IN (2)


/* For Employee and Payroll */
SELECT Emp.EMPLOYEE_FIRSTNAME
    FROM Employee Emp
    JOIN Payroll payr ON payr.EMPLOYEE_ID = Emp.EMPLOYEE_ID
	AND payr.PAY_TYPE IN ('Monthly')

