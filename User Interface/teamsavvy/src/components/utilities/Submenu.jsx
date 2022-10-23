import BarChartIcon from '@mui/icons-material/BarChart';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import pic from "../../assets/img/Profilepic.png"

export const submenu = [
    {
        id: 0,
        img: pic,
        icon: <PersonOutlineOutlinedIcon/>,
        text: "Profile",
        link: "profile"
    },
    {
        id: 1,
        icon: <BarChartIcon/>,
        text: "Dashboard",
        link: "/"
    },
    {
        id: 2,
        icon: <AccessTimeOutlinedIcon/>,
        text: "Timesheet",
        link: "timesheet"
    },
    {
        id: 3,
        icon: <AssignmentTurnedInOutlinedIcon/>,
        text: "Task",
        link: "task"
    },
    {
        id: 4,
        icon: <AccountBalanceWalletOutlinedIcon/>,
        text: "Payroll",
        link: "payroll"
    },
    {
    id: 5,
    icon: <BusinessCenterOutlinedIcon/>,
    text: "Jobs",
    link: "jobs"
    },
    {
    id: 6,
    icon: <LogoutIcon/>,
    text: "Logout",
    link: "logout"
    }
]