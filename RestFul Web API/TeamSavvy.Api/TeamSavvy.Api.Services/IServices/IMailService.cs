using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TeamSavvy.Api.BusinessModel.EmailModel;

namespace TeamSavvy.Api.Services.IServices
{
    public interface IMailService
    {
        Task SendEmilAsync(string body);
    }
}
