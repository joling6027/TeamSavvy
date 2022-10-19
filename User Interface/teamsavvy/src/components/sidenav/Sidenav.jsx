import { NavLink } from "react-router-dom";
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { submenu } from "../utilities/Submenu";
import { useState } from "react";
import styles from "./sidenav.module.css"
import logo from "../../assets/img/sideBarLogo.png"

export default function Sidenav() {
    const [open, setopen] = useState(true)
    const toggleOpen = () => {
        setopen(!open)
    }
    const Profile = "Profile";
  return (
    <>
    <div className={open?styles.sidenav:styles.sidenavClosed} id="sidenav">
        <button className={styles.menuBtn} onClick={toggleOpen}>
            {open? <FormatListBulletedOutlinedIcon />: <CloseOutlinedIcon />}
        </button>
        <NavLink className="navlinklogo d-inline-block">
          <a href="#" className="ps-3 d-inline-block">
            {/* <img src= {logo} alt="teamsavvy logo" className="tslogo overflow-hidden  mb-3"/> */}
            </a>
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
