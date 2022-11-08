using AutoMapper;
using AutoMapper.Configuration;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MimeKit;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using TeamSavvy.Api.BusinessModel.DataTransferModel.Teams;
using TeamSavvy.Api.BusinessModel.EmailModel;
using TeamSavvy.Api.Entities.Context;
using TeamSavvy.Api.Entities.GenericRepo;
using TeamSavvy.Api.Services.IServices;
using TeamSavvy.Api.Utilities.Helper;
using SmtpClient = System.Net.Mail.SmtpClient;

namespace TeamSavvy.Api.Services.Services
{
    public class MailService : IMailService
    {
        
        #region Private Member Variables
        /// <summary>
        /// Initialise generic data context variable.
        /// </summary>
        private readonly GenericUnitOfWork<TeamSavvyContext> _unitOfWork;
        private readonly IMapper _mapper;
        private readonly MailSetting _mailSettings;
        #endregion

        #region constructor
        public MailService(IOptions<MailSetting> mailSettings, GenericUnitOfWork<TeamSavvyContext> unitOfWork,  IMapper mapper )
        {
            _mailSettings = mailSettings.Value;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        #endregion

        public async Task SendEmilAsync(string body)
        {

            //var email = new MimeMessage();
            //email.From.Add(MailboxAddress.Parse("corine.witting88@ethereal.email"));
            //email.To.Add(MailboxAddress.Parse("corine.witting88@ethereal.email"));
            //email.Subject = "Test Email";
            //email.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            //{
            //    Text = body
            //};

            //using var smtp = new SmtpClient();
            //smtp.Connect("smtp.ethereal.email", 587, SecureSocketOptions.StartTls);
            //smtp.Authenticate("corine.witting88@ethereal.email", "FuHT75Yph1p2RJr9HR");
            //smtp.Send(email);
            //smtp.Disconnect(true);
        }

        public async Task<string> SendOTPAsync(int employeeId)
        {

            var otp = GenerateRandomOTP(4);

            MailMessage message = new MailMessage();
            message.From = new MailAddress(_mailSettings.EmailUserName);
            message.Subject = "NEW OTP";
            message.To.Add(new MailAddress(email));
            message.Body = "Please donot share your otp with anyone else and this will destroy once you use it <br>OTP: " + otp;
            message.IsBodyHtml = true;
            var smtpClient = new SmtpClient(_mailSettings.Host)
            {
                Port = _mailSettings.Port,
                Credentials = new NetworkCredential(_mailSettings.EmailUserName, _mailSettings.Password),
                EnableSsl = true,
            };

            smtpClient.Send(message);
            //var emal = new MimeMessage();
            //emal.From.Add(MailboxAddress.Parse(_mailSettings.EmailUserName));
            //emal.To.Add(MailboxAddress.Parse(email));
            //emal.Subject = "NEW OTP";
            //emal.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            //{
            //    Text = "Please donot share your otp with anyone else and this will destroy once you use it <br>OTP: " + otp
            //};

            //using var smtp = new SmtpClient();
            //smtp.Connect(_mailSettings.Host, _mailSettings.Port, SecureSocketOptions.StartTls);
            //smtp.Authenticate(_mailSettings.EmailUserName, _mailSettings.Password);
            //smtp.Send(emal);
            //smtp.Disconnect(true);

            return otp;
        }

        public  async Task SendResignationEmail(ResignationEmail resignationEmail)
        {
            var empEmail = _unitOfWork.Context.Employee.Where(e => e.EmployeeId == resignationEmail.EmployeeId).FirstOrDefault().Email;
            var projId = _unitOfWork.Context.EmployeeProject.Where(p => p.EmployeeId == resignationEmail.EmployeeId).FirstOrDefault().ProjectId;
            var managerId = _unitOfWork.Context.Project.Where(p => p.ProjectId == projId).FirstOrDefault().ProjectManagerId;
            
            var managerEmail = _unitOfWork.Context.Employee.Where(e => e.EmployeeId == managerId).FirstOrDefault().Email;
            //var empIds = _unitOfWork.Context.EmployeeProject.Where(p => p.ProjectId == projId).Select(e => e.EmployeeId).ToList();
            //var managerRoleId = _unitOfWork.Context.Role.Where(r => r.RoleType == Access.Manager).FirstOrDefault().RoleId;
            //var manager = _unitOfWork.Context.Employee.Where(e => empIds.Contains(e.EmployeeId) && e.RoleId == managerRoleId).FirstOrDefault();

            if(managerEmail != null)
            {

                MailMessage message = new MailMessage();
                message.From = new MailAddress(_mailSettings.EmailUserName);
                message.Subject = "RESIGNATION INITIATE";
                message.To.Add(new MailAddress(empEmail));
                message.CC.Add(new MailAddress(managerEmail));
                message.Body = resignationEmail.Body;
                message.IsBodyHtml = true;
                var smtpClient = new SmtpClient(_mailSettings.Host)
                {
                    Port = _mailSettings.Port,
                    Credentials = new NetworkCredential(_mailSettings.EmailUserName, _mailSettings.Password),
                    EnableSsl = true,
                };

                smtpClient.Send(message);

                //var email = new MimeMessage();
                //email.From.Add(MailboxAddress.Parse(_mailSettings.EmailUserName));
                //email.To.Add(MailboxAddress.Parse(emp));
                //email.Cc.Add(MailboxAddress.Parse(manager.Email));
                //email.Subject = "RESIGNATION INITIATE";
                //email.Body = new TextPart(MimeKit.Text.TextFormat.Html)
                //{
                //    Text = resignationEmail.Body
                //};

                //using var smtp = new SmtpClient();
                //smtp.Connect(_mailSettings.Host, _mailSettings.Port, SecureSocketOptions.StartTls);
                //smtp.Authenticate(_mailSettings.EmailUserName, _mailSettings.Password);
                //smtp.Send(email);
                //smtp.Disconnect(true);
            }

        }


        private string GenerateRandomOTP(int iOTPLength)
        {

            string[] saAllowedCharacters = { "1", "2", "3", "4", "5", "6", "7", "8", "9", "0" };
            string sOTP = String.Empty;
            string sTempChars = String.Empty;
            Random rand = new Random();

            for (int i = 0; i < iOTPLength; i++)
            {
                int p = rand.Next(0, saAllowedCharacters.Length);
                sTempChars = saAllowedCharacters[rand.Next(0, saAllowedCharacters.Length)];
                sOTP += sTempChars;
            }

            return sOTP;

        }


    }
}
