using AutoMapper;
using AutoMapper.Extensions.ExpressionMapping;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamSavvy.Api.BusinessModel.AuthModel;
using TeamSavvy.Api.BusinessModel.EmailModel;
using TeamSavvy.Api.Entities.Context;
using TeamSavvy.Api.Entities.GenericRepo;
using TeamSavvy.Api.Middleware.Configuration;
using TeamSavvy.Api.Services.IServices;
using TeamSavvy.Api.Services.Services;
using TeamSavvy.Api.Utilities.MapperRegistration;

namespace TeamSavvy.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
                services.AddControllers();
                services.AddCors(c =>
                {
                    c.AddPolicy("AllowOrigin", options =>
                    {
                        options.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod().Build();
                    });
                });
                services.AddSwaggerGen(c =>
                {
                    c.SwaggerDoc(
                        name: "v1",
                        new Microsoft.OpenApi.Models.OpenApiInfo
                        {
                            Title = "Team Savvy Web API",
                            Version = "v1"
                        });

                    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                    {
                        Description =  "Team Savvy Authorization." +
                                       " \r\n\r\n Enter 'Bearer' [space] and then your token in the text input below." +
                                       "\r\n\r\nExample: \"Bearer 12345abcdef\"",
                        Name = "Team Savvy Authorization",
                        In = ParameterLocation.Header,
                        Type = SecuritySchemeType.ApiKey,
                        Scheme = "Bearer"
                    });
                    c.AddSecurityRequirement(new OpenApiSecurityRequirement()
                    {
                        {
                            new OpenApiSecurityScheme
                            {
                                  Reference = new OpenApiReference
                                  {
                                      Type = ReferenceType.SecurityScheme,
                                      Id = "Bearer"
                                  },
                                  Scheme = "oauth2",
                                  Name = "Bearer",
                                  In = ParameterLocation.Header,
                            },
                            new List<string>()
                        }
                    });
                });

                var JwtIssuerOptionsSection = Configuration.GetSection("JwtIssuerOptions");
                services.Configure<AppSettings>(JwtIssuerOptionsSection);

                //JWT Authentication
                var JwtIssuerOptions = JwtIssuerOptionsSection.Get<AppSettings>();
                var key = Encoding.ASCII.GetBytes(JwtIssuerOptions.SecretKey);

                services.AddAuthentication(au =>
                    {
                        au.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                        au.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                    })
                .AddJwtBearer(jwt =>
                    {
                        jwt.RequireHttpsMetadata = false;
                        jwt.SaveToken = true;
                        jwt.TokenValidationParameters = new TokenValidationParameters
                        {
                            ValidateIssuerSigningKey = true,
                            IssuerSigningKey = new SymmetricSecurityKey(key),
                            ValidateIssuer = false,
                            ValidateAudience = false
                        };
                    });

            var mapperConfiguration = new MapperConfiguration(cfg =>
            {
                cfg.ConfigureDataProfiles();
                cfg.AddExpressionMapping();
            });
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            // get the connection string from appsettings.json
            var connectionString = Configuration.GetConnectionString("TeamSavvy_DB");
            services.AddDbContext<TeamSavvyContext>(options =>
            options.UseSqlServer(
            connectionString, b => b.MigrationsAssembly("TeamSavvy")));

            services.AddScoped<GenericUnitOfWork<TeamSavvyContext>>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<ITimeSheetService, TimeSheetService>();
            services.AddScoped<IEmployeeService, EmployeeService>();
            services.AddScoped<IProjectsService, ProjectsService>();
            services.AddScoped<IEmployeeTasksService, EmployeeTasksService>();
            services.AddScoped<IPayRollService, PayRollService>();
            services.AddScoped<ISalaryService, SalaryService>();
            services.AddScoped<ILeavesService, LeavesService>();
            services.AddScoped<IDropdownsService, DropdownsService>();
            services.AddScoped<IJobsService, JobsService>();

            services.Configure<MailSetting>(Configuration.GetSection("MailSetting"));
            services.AddScoped<IMailService, MailService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint(url: "/swagger/v1/swagger.json", name: "Team Savvy Web Api Version: 1.0");
            });
            app.UseHttpsRedirection();

            // Setting middleware for global level exception handling.
            app.ConfigureExceptionMiddleware();

            // global CORS policy
            
            app.UseAuthentication();
            app.UseRouting();
            app.UseCors("AllowOrigin");
            app.UseAuthorization();
            
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
