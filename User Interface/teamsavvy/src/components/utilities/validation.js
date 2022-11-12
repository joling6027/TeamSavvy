export function LoginValidation(values){
    const errors = {};

    if(!values.email)
    {
        errors.email = "Please enter email.";
    }
    else if(!validateEmail(values.email))
    {
        errors.email = "Please enter a valid email.";
    }

    if(!values.password){
        errors.password = "Please enter the password";
    }
    else if(!validatePassword(values.password)){
        errors.password = "Please enter a valid password";
    }

    return errors;
}

export function RegisterationValidation(values, salary){

    const errors = {};
    console.log('inside')
    if(!values.employeeFirstname || values.employeeFirstname === undefined)
    {
        errors.employeeFirstname = "Please enter first name.";
    }

    if(!values.employeeLastname || values.employeeLastname === undefined)
    {
        errors.employeeLastname = "Please enter last name.";
    }

    if(!values.phone || values.phone === undefined)
    {
        errors.phone = "Please enter phone number.";
    }

    if(!values.bankaccount || values.bankaccount === undefined)
    {
        errors.bankaccount = "Please enter bank account number.";
    }

    if(!values.bankname || values.bankname === undefined)
    {
        errors.bankname = "Please enter bank name.";
    }

    if(!salary || salary === undefined)
    {
        errors.salary = "Please enter employee salary.";
    }

    if(!values.bankcode || values.bankcode === undefined)
    {
        errors.bankcode = "Please enter bank code.";
    }

    if(!values.address.apartment || values.address.apartment === undefined)
    {
        errors.apartment = "Please enter address.";
    }

    if(values.extension <= 0 || values.phone === undefined)
    {
        errors.extension = "Please enter extension number.";
    }

    if(!values.dateofbirth || values.dateofbirth === undefined)
    {
        errors.dateofbirth = "Please enter date of birth.";
    }

    if(!values.hiredate || values.hiredate === undefined)
    {
        errors.hiredate = "Please enter hire date.";
    }

    if(!values.email)
    {
        errors.email = "Please enter email.";
    }
    else if(!validateEmail(values.email))
    {
        errors.email = "Please enter a valid email.";
    }

    if(!values.password){
        errors.password = "Please enter the password";
    }

    else if(!validatePassword(values.password)){
        errors.password = "Please enter a valid password with min 8 letter password, with at least a special character, upper and lower case letters and a number";
    }

    // if(!values.confirmPassword){
    //     errors.confirmPassword = "Please enter the confirm password";
    // }
    // else if(!validatePassword(values.confirmPassword)){
    //     errors.confirmPassword = "Please enter a valid confirm password";
    // }

    // if(values.password !== values.confirmPassword)
    // {
    //     errors.confirmPassword = "Please enter same password and confirm password."
    // }

    return errors;
}

export function ProfileValidation(values){

    const errors = {};
    console.log('inside')
    console.log(values)
    if(!values.employeeFirstname || values.employeeFirstname === undefined)
    {
        errors.employeeFirstname = "Please enter first name.";
    }

    if(!values.employeeLastname || values.employeeLastname === undefined)
    {
        errors.employeeLastname = "Please enter last name.";
    }

    if(!values.phone || values.phone === undefined)
    {
        errors.phone = "Please enter phone number.";
    }

    if(!values.address.apartment || values.address.apartment === undefined)
    {
        errors.apartment = "Please enter address.";
    }


    if(!values.dateofbirth || values.dateofbirth === undefined)
    {
        errors.dateofbirth = "Please enter date of birth.";
    }

   
    return errors;
}

export function ForgetPasswordValidation(values){
    const errors = {};

    if(!values.forgetPassword){
        errors.forgetPassword = "Please enter the password";
    }
    else if(!validatePassword(values.forgetPassword)){
        errors.forgetPassword = "Please enter a valid password";
    }

    if(!values.forgetConfirmPassword){
        errors.forgetConfirmPassword = "Please enter the confirm password";
    }
    else if(!validatePassword(values.forgetConfirmPassword)){
        errors.forgetConfirmPassword = "Please enter a valid confirm password";
    }

    if(values.forgetPassword !== values.forgetConfirmPassword)
    {
        errors.forgetConfirmPassword = "Please enter same password and confirm password."
    }

    return errors;
}

const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

  const validatePassword = (password) => {
    //min 8 letter password, with at least a symbol, upper and lower case letters and a number
    var reg = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return reg.test(password);
}