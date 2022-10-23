using System;
using System.Collections.Generic;
using System.Text;

namespace TeamSavvy.Api.BusinessModel.DataTransferModel
{
    public class LoginDto
    {
        public int EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Token { get; set; }
        public String Role { get; set; }
    }

    public class AuthDto
    {
        public int EmployeeId { get; set; }
        public String Password { get; set; }
    }
}
