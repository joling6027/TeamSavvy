using System;
using System.Collections.Generic;
using System.Text;
using TeamSavvy.Api.BusinessModel.DataTransferModel;

namespace TeamSavvy.Api.Services.IServices
{
    public interface IAuthService
    {
        LoginDto Authenticate(int employeeId, string password);
    }
}
