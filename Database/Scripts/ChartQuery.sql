/****** Script for SelectTopNRows command from SSMS  ******/
  /*Number of Employees that have same skill.*/
  
  SELECT TOP (1000) 
  EmpSkill.[EMPLOYEE_ID], EmpSkill.SKILL_ID
  FROM [TeamSavvy].[dbo].[Employee_SKILL] EmpSkill
  JOIN SKILL skill ON skill.SKILL_ID = EmpSkill.SKILL_ID
  WHERE skill.SKILL_ID = (1) 

  SELECT COUNT (EmpSkill.[EMPLOYEE_ID])
  FROM [TeamSavvy].[dbo].[Employee_SKILL] EmpSkill
  JOIN SKILL skill ON skill.SKILL_ID = EmpSkill.SKILL_ID
  WHERE skill.SKILL_ID = (1) 


/* Select Number of Sick and Vacation Leaves applies */

  SELECT TOP (1000) 
  Emp.[EMPLOYEE_ID], Emp.LEAVE_STATUS
  FROM [TeamSavvy].[dbo].[Employee_Leave] Emp
  JOIN Employee_Leave EmpLeave ON EmpLeave.EMPLOYEE_ID = Emp.EMPLOYEE_ID
  JOIN Leave leave ON leave.LEAVE_TYPE_ID = EmpLeave.LEAVE_TYPE_ID
  AND EmpLeave.LEAVE_TYPE_ID IN (1) 

  SELECT COUNT (Emp.[EMPLOYEE_ID])
  FROM [TeamSavvy].[dbo].[Employee_Leave] Emp
  JOIN Employee_Leave EmpLeave ON EmpLeave.EMPLOYEE_ID = Emp.EMPLOYEE_ID
  JOIN Leave leave ON leave.LEAVE_TYPE_ID = EmpLeave.LEAVE_TYPE_ID
  AND EmpLeave.LEAVE_TYPE_ID IN (1,2)


/* Number of Employees who applied for leaves and status got approved */
select COUNT(EMPLOYEE_ID) as complete_name
from employee
where EMPLOYEE_ID not in
(
  select EMPLOYEE_ID
  from Employee_Leave
  where LEAVE_TYPE_ID =  1
  AND LEAVE_STATUS = 'Approved'
)

/* Count of Leaves that got Approved*/
SELECT TOP (1000) (EMPLOYEE_ID) as complete_name
from employee
where EMPLOYEE_ID not in
(
  select EMPLOYEE_ID
  from Employee_Leave
  where LEAVE_TYPE_ID =  1
  AND LEAVE_STATUS = 'Approved'
)

/* Number of Employees who applied for leaves and status got rejected */
select COUNT(EMPLOYEE_ID) as complete_name
from employee
where EMPLOYEE_ID not in
(
  select EMPLOYEE_ID
  from Employee_Leave
  where LEAVE_STATUS = 'Rejected'
);



/* Select a highest budget project . */

SELECT * FROM Project WHERE PROJECT_BUDGET=(select max(PROJECT_BUDGET) from Project)

/*Display Project_Name wrt to Budget */
SELECT PROJECT_NAME, PROJECT_BUDGET FROM Project ORDER BY PROJECT_BUDGET 

SELECT PROJECT_NAME, PROJECT_CLIENT FROM Project


/* Number of project associated with clients*/
SELECT COUNT(PROJECT_ID)  FROM PROJECT WHERE PROJECT_CLIENT IN 
('KPMG','Whirlpool','Douglas','EY','Delloite')


SELECT PROJECT_ID, PROJECT_NAME  FROM PROJECT WHERE PROJECT_CLIENT IN 
('KPMG')

SELECT COUNT(PROJECT_ID)  FROM PROJECT WHERE PROJECT_CLIENT IN 
('KPMG')




/*Project-Task*/
/* Display Number of tasks each Project has. */

SELECT TOP (1000) Task.[TASK_ID], TASK.PROJECT_ID
  FROM [TeamSavvy].[dbo].[Task] Task
  JOIN Employee_Project EmpProject ON EmpProject.PROJECT_ID = TASK.PROJECT_ID
  AND EmpProject.PROJECT_ID=2 


  SELECT TOP (1000) Task.[TASK_ID], TASK.PROJECT_ID
  FROM [TeamSavvy].[dbo].[Task] Task
  JOIN Employee_Project EmpProject ON EmpProject.PROJECT_ID = TASK.PROJECT_ID
  AND EmpProject.PROJECT_ID= 3 

  SELECT TOP (1000) Task.[TASK_ID], TASK.PROJECT_ID
  FROM [TeamSavvy].[dbo].[Task] Task
  JOIN Employee_Project EmpProject ON EmpProject.PROJECT_ID = TASK.PROJECT_ID
  AND EmpProject.PROJECT_ID=8 

  SELECT TOP (1000) Task.[TASK_ID], TASK.PROJECT_ID
  FROM [TeamSavvy].[dbo].[Task] Task
  JOIN Employee_Project EmpProject ON EmpProject.PROJECT_ID = TASK.PROJECT_ID
  AND EmpProject.PROJECT_ID=9 

  SELECT TOP (1000) Task.[TASK_ID], TASK.PROJECT_ID
  FROM [TeamSavvy].[dbo].[Task] Task
  JOIN Employee_Project EmpProject ON EmpProject.PROJECT_ID = TASK.PROJECT_ID
  AND EmpProject.PROJECT_ID= 10 

  SELECT TOP (1000) Task.[TASK_ID], TASK.PROJECT_ID
  FROM [TeamSavvy].[dbo].[Task] Task
  JOIN Employee_Project EmpProject ON EmpProject.PROJECT_ID = TASK.PROJECT_ID
  AND EmpProject.PROJECT_ID= 11

  /* Count of Tasks each project has */
    SELECT Count (Task.[TASK_ID])
  FROM [TeamSavvy].[dbo].[Task] Task
  JOIN Employee_Project EmpProject ON EmpProject.PROJECT_ID = TASK.PROJECT_ID
  AND EmpProject.PROJECT_ID= 11



/* Project-TaskStatus */
/* Number of tasks that are (Assigned,In-progress, Completed) each project has */
/* Number of Task that are counted wrt to Task status*/

SELECT TOP (1000) Task.[TASK_ID]
       [TASK_STATUS]
  FROM [TeamSavvy].[dbo].[Task] Task
  JOIN Employee_Project EmpProject ON EmpProject.PROJECT_ID = TASK.PROJECT_ID
  AND Task.TASK_STATUS IN ('Assigned','In-Progress','Completed') 


  SELECT TOP (1000) Task.[TASK_ID],
       [TASK_STATUS],
	   Task.[PROJECT_ID]
  FROM [TeamSavvy].[dbo].[Task] Task
  JOIN Employee_Project EmpProject ON EmpProject.PROJECT_ID = TASK.PROJECT_ID
  AND Task.TASK_STATUS IN ('Assigned') 

   SELECT TOP (1000) [TASK_ID],
       [TASK_STATUS],
	   Task.[PROJECT_ID]
  FROM [TeamSavvy].[dbo].[Task] Task
  JOIN Employee_Project EmpProject ON EmpProject.PROJECT_ID = TASK.PROJECT_ID
  AND Task.TASK_STATUS IN ('In-Progress')
  
   SELECT TOP (1000) [TASK_ID],
       [TASK_STATUS],
	   Task.[PROJECT_ID]
  FROM [TeamSavvy].[dbo].[Task] Task
  JOIN Employee_Project EmpProject ON EmpProject.PROJECT_ID = TASK.PROJECT_ID
  AND Task.TASK_STATUS IN ('Completed') 

  SELECT * FROM Employee_Leave
  
  select COUNT(PROJECT_ID) as complete_name
from TASK
where PROJECT_ID not in
(
  select PROJECT_ID
  from TASK
  where TASK_STATUS =  'Assigned'
)





