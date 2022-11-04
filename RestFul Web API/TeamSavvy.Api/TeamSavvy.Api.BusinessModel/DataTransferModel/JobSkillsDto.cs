using System;
using System.Collections.Generic;
using System.Text;

namespace TeamSavvy.Api.BusinessModel.DataTransferModel
{
    public class JobSkillsDto
    {
        public int Jobskillid { get; set; }
        public int Jobid { get; set; }
        public int Skillid { get; set; }
        public SkillDto Skills { get; set; }
    }
}
