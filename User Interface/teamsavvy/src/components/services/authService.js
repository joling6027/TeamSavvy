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
        navigate('/dashboard');
    };

    const setDropdown = (data) =>{
        sessionStorage.setItem('dropdown', JSON.stringify(data));
    };

    const getDropdown = () =>{
        const dd_data =  sessionStorage.getItem('dropdown');
        const dd_detail =  JSON.parse(dd_data);
        return dd_detail;
    }

    const logout = () =>{
        sessionStorage.clear();
        navigate('/login')
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
        getDropdown,
        setDropdown,
        logout,
        http
    }
}
 
export default AuthService;