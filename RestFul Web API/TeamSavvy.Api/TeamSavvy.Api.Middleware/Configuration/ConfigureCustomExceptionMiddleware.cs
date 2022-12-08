using Microsoft.AspNetCore.Builder;
using System;
using System.Collections.Generic;
using System.Text;
using TeamSavvy.Api.Middleware.Middlewares;

namespace TeamSavvy.Api.Middleware.Configuration
{
    public static class ConfigureCustomExceptionMiddleware
    {
        public static void ConfigureExceptionMiddleware(this IApplicationBuilder app)
        {
            app.UseMiddleware<ExceptionMiddleware>();
        }
    }
}
