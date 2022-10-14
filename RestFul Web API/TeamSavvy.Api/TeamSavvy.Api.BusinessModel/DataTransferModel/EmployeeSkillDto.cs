using System;
using System.Collections.Generic;
using System.Text;

namespace TeamSavvy.Api.BusinessModel.DataTransferModel
{
    public class EmployeeSkillDto
    {
        public int EmployeeSkillId { get; set; }
        public int EmployeeId { get; set; }
        public int SkillId { get; set; }
        public bool Isactive { get; set; }
    }

    public class EmployeeSkillReadDto
    {
        public int EmployeeSkillId { get; set; }
        public int EmployeeId { get; set; }
        public int SkillId { get; set; }
        public string SkillName { get; set; }
        public bool Isactive { get; set; }
    }
}
