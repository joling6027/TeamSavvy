using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using TeamSavvy.Api.Entities.Models;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace TeamSavvy.Api.Entities.Context
{
    public partial class TeamSavvyContext : DbContext
    {
        public TeamSavvyContext()
        {
        }

        public TeamSavvyContext(DbContextOptions<TeamSavvyContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Address> Address { get; set; }
        public virtual DbSet<City> City { get; set; }
        public virtual DbSet<Country> Country { get; set; }
        public virtual DbSet<Dashboard> Dashboard { get; set; }
        public virtual DbSet<Department> Department { get; set; }
        public virtual DbSet<Employee> Employee { get; set; }
        public virtual DbSet<EmployeeLeave> EmployeeLeave { get; set; }
        public virtual DbSet<EmployeeProject> EmployeeProject { get; set; }
        public virtual DbSet<EmployeeSkill> EmployeeSkill { get; set; }
        public virtual DbSet<Job> Job { get; set; }
        public virtual DbSet<JobApplied> JobApplied { get; set; }
        public virtual DbSet<JobCategory> JobCategory { get; set; }
        public virtual DbSet<JobLocation> JobLocation { get; set; }
        public virtual DbSet<JobSkills> JobSkills { get; set; }
        public virtual DbSet<Leave> Leave { get; set; }
        public virtual DbSet<Payroll> Payroll { get; set; }
        public virtual DbSet<Project> Project { get; set; }
        public virtual DbSet<Province> Province { get; set; }
        public virtual DbSet<Role> Role { get; set; }
        public virtual DbSet<Salary> Salary { get; set; }
        public virtual DbSet<Skill> Skill { get; set; }
        public virtual DbSet<Status> Status { get; set; }
        public virtual DbSet<Task> Task { get; set; }
        public virtual DbSet<TimeSheet> TimeSheet { get; set; }
        public virtual DbSet<Widget> Widget { get; set; }
        public virtual DbSet<WidgetType> WidgetType { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
//                optionsBuilder.UseSqlServer("Server=.\\SQLExpress;Database=TeamSavvy;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Address>(entity =>
            {
                entity.Property(e => e.AddressId).HasColumnName("Address_ID");

                entity.Property(e => e.Apartment)
                    .IsRequired()
                    .HasColumnName("APARTMENT")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.CityId).HasColumnName("CITY_ID");

                entity.Property(e => e.Postcode)
                    .IsRequired()
                    .HasColumnName("POSTCODE")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.City)
                    .WithMany(p => p.Address)
                    .HasForeignKey(d => d.CityId)
                    .HasConstraintName("FK_Address_City");
            });

            modelBuilder.Entity<City>(entity =>
            {
                entity.Property(e => e.CityId).HasColumnName("CITY_ID");

                entity.Property(e => e.CityName)
                    .IsRequired()
                    .HasColumnName("CITY_NAME")
                    .IsUnicode(false);

                entity.Property(e => e.ProvinceId).HasColumnName("PROVINCE_ID");

                entity.HasOne(d => d.Province)
                    .WithMany(p => p.City)
                    .HasForeignKey(d => d.ProvinceId)
                    .HasConstraintName("FK_City_Province");
            });

            modelBuilder.Entity<Country>(entity =>
            {
                entity.Property(e => e.CountryId).HasColumnName("COUNTRY_ID");

                entity.Property(e => e.CountryName)
                    .IsRequired()
                    .HasColumnName("COUNTRY_NAME")
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Dashboard>(entity =>
            {
                entity.Property(e => e.DashboardId)
                    .HasColumnName("DASHBOARD_ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasColumnName("CREATED_BY")
                    .HasMaxLength(10)
                    .IsFixedLength();

                entity.Property(e => e.CreatedById).HasColumnName("CREATED_BY_ID");

                entity.Property(e => e.CreatedOn)
                    .HasColumnName("CREATED_ON")
                    .HasColumnType("date");

                entity.Property(e => e.EmployeeId).HasColumnName("EMPLOYEE_ID");

                entity.Property(e => e.IsDeleted).HasColumnName("IS_DELETED");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.Dashboard)
                    .HasForeignKey(d => d.EmployeeId)
                    .HasConstraintName("FK_Dashboard_Employee");
            });

            modelBuilder.Entity<Department>(entity =>
            {
                entity.Property(e => e.DepartmentId)
                    .HasColumnName("DEPARTMENT_ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.DepartmentName)
                    .IsRequired()
                    .HasColumnName("DEPARTMENT_NAME")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Employee>(entity =>
            {
                entity.Property(e => e.EmployeeId).HasColumnName("EMPLOYEE_ID");

                entity.Property(e => e.AddressId).HasColumnName("ADDRESS_ID");

                entity.Property(e => e.Bankaccount)
                    .HasColumnName("BANKACCOUNT")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Bankcode)
                    .HasColumnName("BANKCODE")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Bankname)
                    .HasColumnName("BANKNAME")
                    .IsUnicode(false);

                entity.Property(e => e.Dateofbirth)
                    .IsRequired()
                    .HasColumnName("DATEOFBIRTH")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.DepartmentId).HasColumnName("DEPARTMENT_ID");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("EMAIL")
                    .IsUnicode(false);

                entity.Property(e => e.EmployeeFirstname)
                    .IsRequired()
                    .HasColumnName("EMPLOYEE_FIRSTNAME")
                    .HasMaxLength(20)
                    .IsFixedLength();

                entity.Property(e => e.EmployeeImage).HasColumnName("EMPLOYEE_IMAGE");

                entity.Property(e => e.EmployeeLastname)
                    .IsRequired()
                    .HasColumnName("EMPLOYEE_LASTNAME")
                    .HasMaxLength(20)
                    .IsFixedLength();

                entity.Property(e => e.Extension).HasColumnName("EXTENSION");

                entity.Property(e => e.Hiredate)
                    .HasColumnName("HIREDATE")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.JobLocationId).HasColumnName("JOB_LOCATION_ID");

                entity.Property(e => e.Password)
                    .HasColumnName("PASSWORD")
                    .IsUnicode(false);

                entity.Property(e => e.Phone)
                    .IsRequired()
                    .HasColumnName("PHONE")
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.RoleId).HasColumnName("ROLE_ID");

                entity.Property(e => e.StatusId).HasColumnName("STATUS_ID");

                entity.HasOne(d => d.JobLocation)
                    .WithMany(p => p.Employee)
                    .HasForeignKey(d => d.JobLocationId)
                    .HasConstraintName("FK_Employee_Job_location");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Employee)
                    .HasForeignKey(d => d.RoleId)
                    .HasConstraintName("FK_Employee_Potition");

                entity.HasOne(d => d.Status)
                    .WithMany(p => p.Employee)
                    .HasForeignKey(d => d.StatusId)
                    .HasConstraintName("FK_Employee_Status");
            });

            modelBuilder.Entity<EmployeeLeave>(entity =>
            {
                entity.ToTable("Employee_Leave");

                entity.Property(e => e.EmployeeLeaveId).HasColumnName("EMPLOYEE_LEAVE_ID");

                entity.Property(e => e.EmployeeId).HasColumnName("EMPLOYEE_ID");

                entity.Property(e => e.IsApproved).HasColumnName("IS_APPROVED");

                entity.Property(e => e.LeaveApprovalBy)
                    .HasColumnName("LEAVE_APPROVAL_BY")
                    .IsUnicode(false);

                entity.Property(e => e.LeaveApprovalDate)
                    .HasColumnName("LEAVE_APPROVAL_DATE")
                    .HasColumnType("date");

                entity.Property(e => e.LeaveDays).HasColumnName("LEAVE_DAYS");

                entity.Property(e => e.LeaveEnds)
                    .HasColumnName("LEAVE_ENDS")
                    .HasColumnType("date");

                entity.Property(e => e.LeaveStart)
                    .HasColumnName("LEAVE_START")
                    .HasColumnType("date");

                entity.Property(e => e.LeaveStatus)
                    .HasColumnName("LEAVE_STATUS")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LeaveTypeId).HasColumnName("LEAVE_TYPE_ID");
            });

            modelBuilder.Entity<EmployeeProject>(entity =>
            {
                entity.ToTable("Employee_Project");

                entity.Property(e => e.EmployeeProjectId).HasColumnName("EMPLOYEE_PROJECT_ID");

                entity.Property(e => e.EmployeeId).HasColumnName("EMPLOYEE_ID");

                entity.Property(e => e.ProjectId).HasColumnName("PROJECT_ID");

                entity.Property(e => e.Status).HasColumnName("STATUS");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.EmployeeProject)
                    .HasForeignKey(d => d.EmployeeId)
                    .HasConstraintName("FK_Employee_Project_Employee_ID");

                entity.HasOne(d => d.Project)
                    .WithMany(p => p.EmployeeProject)
                    .HasForeignKey(d => d.ProjectId)
                    .HasConstraintName("FK_Employee_Project_ID");
            });

            modelBuilder.Entity<EmployeeSkill>(entity =>
            {
                entity.ToTable("Employee_Skill");

                entity.Property(e => e.EmployeeSkillId).HasColumnName("EMPLOYEE_SKILL_ID");

                entity.Property(e => e.EmployeeId).HasColumnName("EMPLOYEE_ID");

                entity.Property(e => e.Isactive).HasColumnName("ISACTIVE");

                entity.Property(e => e.SkillId).HasColumnName("SKILL_ID");

                entity.HasOne(d => d.Skill)
                    .WithMany(p => p.EmployeeSkill)
                    .HasForeignKey(d => d.SkillId)
                    .HasConstraintName("FK_Employee_Skill_ID");
            });

            modelBuilder.Entity<Job>(entity =>
            {
                entity.Property(e => e.JobId).HasColumnName("JOB_ID");

                entity.Property(e => e.CreatedOn)
                    .HasColumnName("CREATED_ON")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Deadline)
                    .HasColumnName("DEADLINE")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Details)
                    .HasColumnName("DETAILS")
                    .IsUnicode(false);

                entity.Property(e => e.Isdelete).HasColumnName("ISDELETE");

                entity.Property(e => e.JobPosition)
                    .HasColumnName("JOB_POSITION")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Responsibilities)
                    .HasColumnName("RESPONSIBILITIES")
                    .IsUnicode(false);

                entity.Property(e => e.Salary)
                    .HasColumnName("SALARY")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<JobApplied>(entity =>
            {
                entity.ToTable("Job_Applied");

                entity.Property(e => e.JobAppliedId)
                    .HasColumnName("JOB_APPLIED_ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.AppliedOn)
                    .HasColumnName("APPLIED_ON")
                    .HasColumnType("date");

                entity.Property(e => e.EmployeeId).HasColumnName("EMPLOYEE_ID");

                entity.Property(e => e.JobId).HasColumnName("JOB_ID");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.JobApplied)
                    .HasForeignKey(d => d.EmployeeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Job_Applied_Employee");

                entity.HasOne(d => d.Job)
                    .WithMany(p => p.JobApplied)
                    .HasForeignKey(d => d.JobId)
                    .HasConstraintName("FK_Job_Applied_Job_ID");
            });

            modelBuilder.Entity<JobCategory>(entity =>
            {
                entity.ToTable("Job_Category");

                entity.Property(e => e.JobCategoryId).HasColumnName("JOB_CATEGORY_ID");

                entity.Property(e => e.JobCategoryName)
                    .IsRequired()
                    .HasColumnName("JOB_CATEGORY_NAME")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.JobCategoryValue)
                    .IsRequired()
                    .HasColumnName("JOB_CATEGORY_VALUE")
                    .HasMaxLength(10)
                    .IsFixedLength();
            });

            modelBuilder.Entity<JobLocation>(entity =>
            {
                entity.ToTable("Job_Location");

                entity.Property(e => e.JobLocationId).HasColumnName("JOB_LOCATION_ID");

                entity.Property(e => e.CityId).HasColumnName("CITY_ID");

                entity.Property(e => e.Location)
                    .IsRequired()
                    .HasColumnName("LOCATION")
                    .IsUnicode(false);

                entity.Property(e => e.Postcode)
                    .IsRequired()
                    .HasColumnName("POSTCODE")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.City)
                    .WithMany(p => p.JobLocation)
                    .HasForeignKey(d => d.CityId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Job_Location_City");
            });

            modelBuilder.Entity<JobSkills>(entity =>
            {
                entity.HasKey(e => e.Jobskillid);

                entity.ToTable("Job_Skills");

                entity.Property(e => e.Jobskillid).HasColumnName("JOBSKILLID");

                entity.Property(e => e.Jobid).HasColumnName("JOBID");

                entity.Property(e => e.Skillid).HasColumnName("SKILLID");

                entity.HasOne(d => d.Job)
                    .WithMany(p => p.JobSkills)
                    .HasForeignKey(d => d.Jobid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Job_Skills_Job");

                entity.HasOne(d => d.Skill)
                    .WithMany(p => p.JobSkills)
                    .HasForeignKey(d => d.Skillid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Job_Skills_Skill");
            });

            modelBuilder.Entity<Leave>(entity =>
            {
                entity.HasKey(e => e.LeaveTypeId);

                entity.Property(e => e.LeaveTypeId).HasColumnName("LEAVE_TYPE_ID");

                entity.Property(e => e.LeaveType)
                    .HasColumnName("LEAVE_TYPE")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Payroll>(entity =>
            {
                entity.HasIndex(e => e.PayDate)
                    .HasName("UNQ_Payroll")
                    .IsUnique();

                entity.Property(e => e.PayrollId).HasColumnName("PAYROLL_ID");

                entity.Property(e => e.Deduction)
                    .HasColumnName("DEDUCTION")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Earning)
                    .HasColumnName("EARNING")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.EmployeeId).HasColumnName("EMPLOYEE_ID");

                entity.Property(e => e.Netpay)
                    .HasColumnName("NETPAY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PayDate)
                    .HasColumnName("PAY_DATE")
                    .HasColumnType("date");

                entity.Property(e => e.PaySick)
                    .HasColumnName("PAY_SICK")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PayType)
                    .HasColumnName("PAY_TYPE")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.PayVacation)
                    .HasColumnName("PAY_VACATION")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PayYtd)
                    .HasColumnName("PAY_YTD")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.SalaryId).HasColumnName("SALARY_ID");

                entity.Property(e => e.TotalHours).HasColumnName("TOTAL_HOURS");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.Payroll)
                    .HasForeignKey(d => d.EmployeeId)
                    .HasConstraintName("FK_Payroll_Employee");

                entity.HasOne(d => d.Salary)
                    .WithMany(p => p.Payroll)
                    .HasForeignKey(d => d.SalaryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Payroll_Salary");
            });

            modelBuilder.Entity<Project>(entity =>
            {
                entity.Property(e => e.ProjectId).HasColumnName("PROJECT_ID");

                entity.Property(e => e.ProjectBudget)
                    .HasColumnName("PROJECT_BUDGET")
                    .IsUnicode(false);

                entity.Property(e => e.ProjectClient)
                    .IsRequired()
                    .HasColumnName("PROJECT_CLIENT")
                    .IsUnicode(false);

                entity.Property(e => e.ProjectDesc)
                    .HasColumnName("PROJECT_DESC")
                    .IsUnicode(false);

                entity.Property(e => e.ProjectEndDate)
                    .HasColumnName("PROJECT_END_DATE")
                    .HasColumnType("date");

                entity.Property(e => e.ProjectLead)
                    .HasColumnName("PROJECT_LEAD")
                    .IsUnicode(false);

                entity.Property(e => e.ProjectManagerId).HasColumnName("PROJECT_MANAGER_ID");

                entity.Property(e => e.ProjectManagerName)
                    .IsRequired()
                    .HasColumnName("PROJECT_MANAGER_NAME")
                    .IsUnicode(false);

                entity.Property(e => e.ProjectName)
                    .IsRequired()
                    .HasColumnName("PROJECT_NAME")
                    .IsUnicode(false);

                entity.Property(e => e.ProjectStartDate)
                    .HasColumnName("PROJECT_START_DATE")
                    .HasColumnType("date");

                entity.Property(e => e.ProjectTotalEmployees).HasColumnName("PROJECT_TOTAL_EMPLOYEES");

                entity.Property(e => e.TotalCompletedCount).HasColumnName("TOTAL_COMPLETED_COUNT");

                entity.Property(e => e.TotalTaskCount).HasColumnName("TOTAL_TASK_COUNT");
            });

            modelBuilder.Entity<Province>(entity =>
            {
                entity.Property(e => e.ProvinceId).HasColumnName("PROVINCE_ID");

                entity.Property(e => e.CountryId).HasColumnName("COUNTRY_ID");

                entity.Property(e => e.ProvinceAbbr)
                    .IsRequired()
                    .HasColumnName("PROVINCE_ABBR")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.ProvinceName)
                    .IsRequired()
                    .HasColumnName("PROVINCE_NAME")
                    .IsUnicode(false);

                entity.HasOne(d => d.Country)
                    .WithMany(p => p.Province)
                    .HasForeignKey(d => d.CountryId)
                    .HasConstraintName("FK_Province_Country");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.Property(e => e.RoleId).HasColumnName("ROLE_ID");

                entity.Property(e => e.RoleType)
                    .IsRequired()
                    .HasColumnName("ROLE_TYPE")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Salary>(entity =>
            {
                entity.HasIndex(e => e.SalaryIncrementDate)
                    .HasName("UNQ_Salary")
                    .IsUnique();

                entity.Property(e => e.SalaryId).HasColumnName("SALARY_ID");

                entity.Property(e => e.EmployeeId).HasColumnName("EMPLOYEE_ID");

                entity.Property(e => e.Employeesalary)
                    .IsRequired()
                    .HasColumnName("EMPLOYEESALARY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.SalaryIncrementDate)
                    .IsRequired()
                    .HasColumnName("SALARY_INCREMENT_DATE")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.SalaryType)
                    .HasColumnName("SALARY_TYPE")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.Salary)
                    .HasForeignKey(d => d.EmployeeId)
                    .HasConstraintName("FK_Salary_Employee_ID");
            });

            modelBuilder.Entity<Skill>(entity =>
            {
                entity.Property(e => e.SkillId).HasColumnName("SKILL_ID");

                entity.Property(e => e.SkillName)
                    .IsRequired()
                    .HasColumnName("SKILL_NAME")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Status>(entity =>
            {
                entity.Property(e => e.StatusId).HasColumnName("STATUS_ID");

                entity.Property(e => e.StatusType)
                    .IsRequired()
                    .HasColumnName("STATUS_TYPE")
                    .HasMaxLength(15)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Task>(entity =>
            {
                entity.Property(e => e.TaskId).HasColumnName("TASK_ID");

                entity.Property(e => e.AssignedBy)
                    .HasColumnName("ASSIGNED_BY")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.AssignedDate)
                    .HasColumnName("ASSIGNED_DATE")
                    .HasColumnType("date");

                entity.Property(e => e.AssignedTo)
                    .HasColumnName("ASSIGNED_TO")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.EmployeeId).HasColumnName("EMPLOYEE_ID");

                entity.Property(e => e.ProjectId).HasColumnName("PROJECT_ID");

                entity.Property(e => e.TaskDesc)
                    .HasColumnName("TASK_DESC")
                    .IsUnicode(false);

                entity.Property(e => e.TaskName)
                    .IsRequired()
                    .HasColumnName("TASK_NAME")
                    .IsUnicode(false);

                entity.Property(e => e.TaskStartDate)
                    .HasColumnName("TASK_START_DATE")
                    .HasColumnType("date");

                entity.Property(e => e.TaskStatus)
                    .HasColumnName("TASK_STATUS")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.TaskTotalHours)
                    .HasColumnName("TASK_TOTAL_HOURS")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.TastEndDate)
                    .HasColumnName("TAST_END_DATE")
                    .HasColumnType("date");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.Task)
                    .HasForeignKey(d => d.EmployeeId)
                    .HasConstraintName("FK_Task_Employee");

                entity.HasOne(d => d.Project)
                    .WithMany(p => p.Task)
                    .HasForeignKey(d => d.ProjectId)
                    .HasConstraintName("FK_Task_Project");
            });

            modelBuilder.Entity<TimeSheet>(entity =>
            {
                entity.Property(e => e.TimesheetId).HasColumnName("TIMESHEET_ID");

                entity.Property(e => e.ClockDate)
                    .HasColumnName("CLOCK_DATE")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.ClockTime)
                    .HasColumnName("CLOCK_TIME")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.ClockType)
                    .HasColumnName("CLOCK_TYPE")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.EmployeeId).HasColumnName("EMPLOYEE_ID");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.TimeSheet)
                    .HasForeignKey(d => d.EmployeeId)
                    .HasConstraintName("FK_TimeSheet_Employee_ID");
            });

            modelBuilder.Entity<Widget>(entity =>
            {
                entity.Property(e => e.WidgetId)
                    .HasColumnName("WIDGET_ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasColumnName("CREATED_BY")
                    .HasMaxLength(10)
                    .IsFixedLength();

                entity.Property(e => e.CreatedOn)
                    .HasColumnName("CREATED_ON")
                    .HasColumnType("date");

                entity.Property(e => e.DashboardId).HasColumnName("Dashboard_ID");

                entity.Property(e => e.Height).HasColumnName("HEIGHT");

                entity.Property(e => e.Length).HasColumnName("LENGTH");

                entity.Property(e => e.WidgetName)
                    .IsRequired()
                    .HasColumnName("WIDGET_NAME")
                    .HasMaxLength(10)
                    .IsFixedLength();

                entity.Property(e => e.WidgetTypeId).HasColumnName("WIDGET_TYPE_ID");

                entity.Property(e => e.XAxis)
                    .IsRequired()
                    .HasColumnName("X_AXIS")
                    .HasMaxLength(10)
                    .IsFixedLength();

                entity.Property(e => e.YAxis)
                    .IsRequired()
                    .HasColumnName("Y_AXIS")
                    .HasMaxLength(10)
                    .IsFixedLength();

                entity.HasOne(d => d.Dashboard)
                    .WithMany(p => p.Widget)
                    .HasForeignKey(d => d.DashboardId)
                    .HasConstraintName("FK_Widget_Widget_type");
            });

            modelBuilder.Entity<WidgetType>(entity =>
            {
                entity.ToTable("Widget_type");

                entity.Property(e => e.WidgetTypeId)
                    .HasColumnName("WIDGET_TYPE_ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.WidgetType1)
                    .IsRequired()
                    .HasColumnName("WIDGET_TYPE")
                    .HasMaxLength(10)
                    .IsFixedLength();
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
