using System;
using System.Collections.Generic;
using System.Text;
using TeamSavvy.Api.BusinessModel.DataTransferModel.Teams;

namespace TeamSavvy.Api.Services.IServices
{
    public interface ITeamsService
    {
        List<Teams> GetTeams(int employeeId);
    }
}
