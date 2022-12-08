using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace TeamSavvy.Api.Utilities.MapperRegistration
{
    public static class MapperRegistration
    {
        /// <summary>
        /// Adds the Entity/Domain automapper profile configurations.
        /// </summary>
        /// <param name="configuration">A <see cref="IMapperConfigurationExpression"/> to add the profiles to.</param>
        public static void ConfigureDataProfiles(this IMapperConfigurationExpression configuration)
        {
            if (configuration == null)
            {
                throw new ArgumentNullException($"The configuration is null.");
            }

            configuration.AddProfile<TeamSavvyProfiler>();
        }
    }
}
