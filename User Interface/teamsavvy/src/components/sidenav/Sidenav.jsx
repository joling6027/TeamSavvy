import { NavLink } from "react-router-dom";
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { submenu } from "../utilities/Submenu";
import { useState } from "react";
import styles from "./sidenav.module.css"
import logocl from "../../assets/img/TS.png";
import logo from "../../assets/img/tsLogo.png";
import {Link} from 'react-router-dom';
import AuthService from "../services/authService";
import { employeeInitialValue } from '../models/employee.model';
import { useEffect } from "react";
import { GetEndPoints } from '../utilities/EndPoints';

export default function Sidenav() {

    const {token, logout} = AuthService();
    const [open, setopen] = useState(true)
    const {http, user} = AuthService();
    const [formValue, setFormValue] = useState(employeeInitialValue);

    const GetEmployee = () => {
      http.get(GetEndPoints().employee + '/' + user.employeeId)
      .then((res) =>{
          if(res.data.success){
              let response = res.data.response;
              setFormValue({...formValue, ...response})
          }
       })
  }

  useEffect(()=>{
    GetEmployee();
  }, user.employeeId)

    const toggleOpen = () => {
        setopen(!open)
    }
    const handleLogout =()=>
    {
       if(token !== undefined){
        logout();
       }
    }
  return (
    <>
    <div className={open?styles.sidenav :styles.sidenavClosed} id="sidenav">
        <button className={styles.menuBtn} onClick={toggleOpen}>
            {open? <FormatListBulletedOutlinedIcon />: <CloseOutlinedIcon />}
        </button>
        <NavLink className="navlinklogo d-inline-block">
          <Link to="#" className="ps-3 d-inline-block">
          {open?  <img src= {logo} alt="teamsavvy logo" className="tslogo overflow-hidden  mb-3"/>
          : <img src= {logocl} alt="teamsavvy logo" className="tslogo overflow-hidden  mb-3"/> }
           
            </Link>
        </NavLink>
        {submenu.map(item =>{
            return `${item.text}` === "Profile" ? 
            <NavLink key={item.id} className={styles.sideitem} to={item.link}>
            <img className={styles.sidebarprofile}  src={`${formValue.employeeImage ? formValue.employeeImage : item.img}`}  alt="profile pic"/>
            <span className={styles.linkText}>{user.firstName.trim() + ' ' + user.lastName.trim()}</span>
        </NavLink>
        :
          `${item.text}` === "Logout" ? 
          <span key={item.id} className={styles.sideitem} onClick={handleLogout}>
          {item.icon}
          <span className={styles.linkText}>{item.text}</span>
          </span>
          :
          <NavLink key={item.id} className={user.role === "Employee" && item.text === "Dashboard" ? "d-none" :styles.sideitem} to={item.link}>
              {item.icon}
              <span className={styles.linkText}>{item.text}</span>
          </NavLink>
        })}
    </div>
    </>
  )
}
