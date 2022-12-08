using System;
using System.Collections.Generic;
using System.Text;

namespace TeamSavvy.Api.BusinessModel.EmailModel
{
    public class ResignationEmail
    {
        public int EmployeeId { get; set; }
        public string Body { get; set; }
    }
}
