using System;
using System.Collections.Generic;
using System.Text;

namespace TeamSavvy.Api.BusinessModel.DataTransferModel.ChangePassword
{
    public class ChangePassword
    {
        public int EmployeeId { get; set; }
        public string Password { get; set; }
    }
}
