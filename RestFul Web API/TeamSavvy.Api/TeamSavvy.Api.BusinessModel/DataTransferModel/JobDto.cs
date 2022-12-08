using System;
using System.Collections.Generic;
using System.Text;

namespace TeamSavvy.Api.BusinessModel.DataTransferModel
{
    public class JobDto
    {
        public int JobId { get; set; }
        public string JobPosition { get; set; }
        public string Salary { get; set; }
        public string Details { get; set; }
        public string Responsibilities { get; set; }
        public string CreatedOn { get; set; }
        public string Deadline { get; set; }
        public bool Isdelete { get; set; }
        public List<JobSkillsDto> JobSkills { get; set; }
    }
}
