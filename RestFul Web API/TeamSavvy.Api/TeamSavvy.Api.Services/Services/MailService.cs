using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using System;
using System.IO;
using System.Threading.Tasks;
using TeamSavvy.Api.BusinessModel.EmailModel;
using TeamSavvy.Api.Services.IServices;

namespace TeamSavvy.Api.Services.Services
{
    public class MailService : IMailService
    {
        private readonly MailSetting _mailSettings;

        public MailService(IOptions<MailSetting> mailSettings)
        {
            _mailSettings = mailSettings.Value;
        }

        public async Task SendEmilAsync(string body)
        {

            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse("corine.witting88@ethereal.email"));
            email.To.Add(MailboxAddress.Parse("corine.witting88@ethereal.email"));
            email.Subject = "Test Email";
            email.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = body
            };

            using var smtp = new SmtpClient();
            smtp.Connect("smtp.ethereal.email", 587, SecureSocketOptions.StartTls);
            smtp.Authenticate("corine.witting88@ethereal.email", "FuHT75Yph1p2RJr9HR");
            smtp.Send(email);
            smtp.Disconnect(true);
            //var email = new MimeMessage();
            //email.Sender = MailboxAddress.Parse(_mailSettings.Mail);
            //email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));
            //email.Subject = mailRequest.Subject;
            //var builder = new BodyBuilder();
            //if (mailRequest.Attachments != null)
            //{
            //    byte[] filebytes;
            //    foreach (var file in mailRequest.Attachments)
            //    {
            //        if(file.Length > 0)
            //        {
            //            using(var ms = new MemoryStream())
            //            {
            //                file.CopyTo(ms);
            //                filebytes = ms.ToArray();
            //            }

            //            builder.Attachments.Add(file.FileName, filebytes, ContentType.Parse(file.ContentType));
            //        }
            //    }
            //}

            //builder.HtmlBody = mailRequest.Body;
            //email.Body = builder.ToMessageBody();


            //using(/*SmtpClient client = new SmtpClient()*/)
            //{
            //    try
            //    {
            //        //client.ServerCertificateValidationCallback = (s, c, h, e) => true;
            //        //client.CheckCertificateRevocation = false;
            //        //await client.ConnectAsync(_mailSettings.Host, _mailSettings.Port, false);
            //        //await client.AuthenticateAsync(_mailSettings.Mail, _mailSettings.Password);
            //        //await client.SendAsync(email);
            //        //client.Disconnect(true);
            //    }
            //    catch(Exception e)
            //    {
            //        String a = e.Message;
            //    }

            ////Make sure to enable less secure app while using gmail
            ////https://accounts.google.com/DisplayUnlockCaptcha
            //}
        }
    }
}
