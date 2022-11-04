export const employeeInitialValue ={
    employeeId: null,
    employeeFirstname: "",
    employeeLastname: "",
    dateofbirth: "",
    hiredate: "",
    phone: "",
    email: "",
    extension: null,
    department: {
      departmentId:null,
      departmentName:""
    },
    role: {
      roleId:null,
      roleType:""
    },
    status: {
      statusId:null,
      statusType:""
    },
    bankaccount: "",
    bankcode: "",
    bankname: "",
    jobLocation: {
      jobLocationId:null,
      location:"",
      postcode:"",
      city: {
          cityId: null,
          cityName :"",
          province:{
              provinceId:null,
              provinceName:"",
              provinceName:"",
              country:{
                  countryId:null,
                  countryId:"",
              }
          }
      }
    },
    employeeImage: null,
    address: {
      addressId: null,
      apartment: null,
      postcode: "",
      city: {
          cityId: null,
          cityName :"",
          province:{
              provinceId:null,
              provinceName:"",
              provinceName:"",
              country:{
                  countryId:null,
                  countryId:"",
              }
          }
      }
    },
    skills: [
      {
        employeeSkillId: null,
        employeeId: null,
        skills: {
            skillId:null,
            skillName:"",
        },
        isactive: null 
      }
    ]
  };