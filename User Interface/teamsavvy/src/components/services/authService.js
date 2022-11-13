import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthService = () => {
    const navigate = useNavigate();
    

    const getToken = () =>{
        const token =  sessionStorage.getItem('token');
        const userToken =  JSON.parse(token);
        return userToken;
    };

    const getUser = () =>{
        const user =  sessionStorage.getItem('user');
        const user_detail =  JSON.parse(user);
        return user_detail;
    };

    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(getUser());
    
    const storeToken = (user, token) =>{
        sessionStorage.setItem('token', JSON.stringify(token));
        sessionStorage.setItem('user', JSON.stringify(user));

        setToken(token);
        setUser(user);
        user.role === "Employee" ? navigate('/profile') : navigate('/dashboard');
    };

    const setDropdownCont = (data) =>{
        sessionStorage.setItem('dropdownCont', JSON.stringify(data));
    };

    const getDropdownCont = () =>{
        const dd_data =  sessionStorage.getItem('dropdownCont');
        const dd_detail =  JSON.parse(dd_data);
        return dd_detail;
    }

    const setSkillLst = (data) =>{
        sessionStorage.setItem('skills', JSON.stringify(data));
    };

    const getSkillsLst = () =>{
        const sk_data =  sessionStorage.getItem('skills');
        const sk_detail =  JSON.parse(sk_data);
        return sk_detail;
    }

    const logout = () =>{
        sessionStorage.clear();
        window.localStorage.clear();
        navigate('/login');
    };

    const http = axios.create({
        baseURL:"https://localhost:44362/api/",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    return{
        setToken : storeToken,
        token,
        user,
        getToken, 
        getDropdownCont,
        setDropdownCont,
        getSkillsLst,
        setSkillLst,
        logout,
        http
    }
}
 
export default AuthService;