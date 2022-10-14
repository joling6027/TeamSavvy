using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace TeamSavvy.Api.Web.Entities
{
    public partial class Skill
    {
        public Skill()
        {
            EmployeeSkill = new HashSet<EmployeeSkill>();
        }

        public int SkillId { get; set; }
        public string SkillName { get; set; }

        public virtual ICollection<EmployeeSkill> EmployeeSkill { get; set; }
    }
}
