import { NavLink } from "react-router-dom";
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { submenu } from "../utilities/Submenu";
import { useState } from "react";
import styles from "./sidenav.module.css"

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
        <NavLink>
          <a href="#"></a>
        </NavLink>
        {submenu.map(item =>{
            return `${item.text}` === "Profile" ? 
            <NavLink key={item.id} className={styles.sideitem} to={item.link}>
            <img className="sidebarprofile d-inline-block" src={item.img} alt="profile pic"/>
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
