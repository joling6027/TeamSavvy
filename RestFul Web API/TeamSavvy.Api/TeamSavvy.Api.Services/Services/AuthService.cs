using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using TeamSavvy.Api.BusinessModel.AuthModel;
using TeamSavvy.Api.BusinessModel.DataTransferModel;
using TeamSavvy.Api.Entities.GenericRepo;
using TeamSavvy.Api.Services.IServices;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using TeamSavvy.Api.Entities.Context;

namespace TeamSavvy.Api.Services.Services
{
    public class AuthService : IAuthService
    {
        #region Private Member Variables

        /// <summary>
        /// Initialise app setting.
        /// </summary>
        private readonly AppSettings _appSettings;

        /// <summary>
        /// Initialise generic data context variable.
        /// </summary>
        private readonly GenericUnitOfWork<TeamSavvyContext> _unitOfWork;
        #endregion
        public AuthService(IOptions<AppSettings> appSettings, GenericUnitOfWork<TeamSavvyContext> unitOfWork)
        {
            _appSettings = appSettings.Value;
            _unitOfWork = unitOfWork;
        }

        #region Public Method
        public LoginDto Authenticate(int employeeId, string password)
        {
            var user = AuthenticateUserFromDb(employeeId, password);
            if (user == null)
                return null;

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.SecretKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[] {
                      new Claim(ClaimTypes.Name, user.EmployeeId.ToString()),
		              // need to get role from database.
		              new Claim(ClaimTypes.Role, user.Role),
                 }),
                Expires = DateTime.UtcNow.AddDays(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                                                            SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            return user;
        }
        #endregion

        #region Private Method
        private LoginDto AuthenticateUserFromDb(int employeeId, string password)
        {
            if (employeeId > 0 && !string.IsNullOrEmpty(password))
            {
                LoginDto userDetail = _unitOfWork.Context.Employee
                     .Join(_unitOfWork.Context.Role,
                                 s => s.RoleId,
                                 t => t.RoleId,
                                 (s, t) => new { Employee = s, Roles = t })
                     .Where(x => x.Employee.EmployeeId == employeeId && x.Employee.Password == password)
                     .Select(x => new LoginDto
                     {
                         Role = x.Roles.RoleType,
                         FirstName = x.Employee.EmployeeFirstname,
                         LastName = x.Employee.EmployeeLastname,
                         EmployeeId = x.Employee.EmployeeId,
                     }).FirstOrDefault();

                if (userDetail != null)
                    return userDetail;
            }
            return null;
        }
        #endregion
    }
}

