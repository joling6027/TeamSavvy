import { NavLink } from "react-router-dom";
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { submenu } from "../utilities/Submenu";
import { useState } from "react";
import styles from "./sidenav.module.css"
import logocl from "../../assets/img/TS.png";
import logo from "../../assets/img/tsLogo.png";
import {Link} from 'react-router-dom';

export default function Sidenav() {
    const [open, setopen] = useState(true)
    const toggleOpen = () => {
        setopen(!open)
    }
    const Profile = "Profile";
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
            <img className={styles.sidebarprofile} src={item.img}  alt="profile pic"/>
            <span className={styles.linkText}>{item.text}</span>
        </NavLink>
        :
        <NavLink key={item.id} className={styles.sideitem} to={item.link}>
            {item.icon}
            <span className={styles.linkText}>{item.text}</span>
        </NavLink>
        })}
    </div>
    </>
  )
}
