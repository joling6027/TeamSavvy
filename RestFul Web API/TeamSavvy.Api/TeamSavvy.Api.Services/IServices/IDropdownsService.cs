using System;
using System.Collections.Generic;
using System.Text;
using TeamSavvy.Api.BusinessModel.DataTransferModel;
using TeamSavvy.Api.BusinessModel.DataTransferModel.DropdownDtos;

namespace TeamSavvy.Api.Services.IServices
{
    public interface IDropdownsService
    {
        List<CountryDdl> GetCountryProvCity();
        List<SkillDto> GetSkills();

    }
}
