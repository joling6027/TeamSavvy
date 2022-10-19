using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace TeamSavvy.Api.Entities.Models
{
    public partial class EmployeeSkill
    {
        public int EmployeeSkillId { get; set; }
        public int EmployeeId { get; set; }
        public int SkillId { get; set; }
        public bool Isactive { get; set; }

        public virtual Skill Skill { get; set; }
    }
}
