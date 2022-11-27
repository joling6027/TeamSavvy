import React, { useState  } from 'react';
import {useNavigate, useLocation } from "react-router-dom";
import "../../assets/css/bootstrap.min.css";
import './header.css';

import {
  Collapse,
  Breadcrumb,
  BreadcrumbItem,
  Alert, 
  Input
} from 'reactstrap';

import {
    Container
} from "reactstrap";

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const pathnames = pathname.split("/").filter(Boolean);
  const [isOpen, setIsOpen] = useState(false);
  const containsNumbers = (str) => {
      return /[0-9]/.test(str);
    }
    return (
        <>
        <Container className="p-4 ">
        <div className="d-inline-block">
        {/* <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                 <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                <li class="breadcrumb-item"><a href="#">Library</a></li>
                 <li class="breadcrumb-item active" aria-current="page">Data</li>
            </ol>
        </nav> */}
        <Breadcrumb listTag="div">
          
          {pathnames.map((name, index) => {
            const routeTo =  `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length -1;
            if(!containsNumbers(name))
            {
              
              return isLast ?
                <BreadcrumbItem className="text-decoration-none"  key={name}>{ name }</BreadcrumbItem>
                :
                containsNumbers(pathnames[index + 1]) ?
                <BreadcrumbItem className="text-decoration-none"  key={name}>{ name }</BreadcrumbItem>
                :
                <BreadcrumbItem className="text-decoration-none text-primary" 
                                style={{cursor:"pointer"}}  
                                key={name} 
                                onClick={() => navigate(routeTo)}>{name}</BreadcrumbItem>
            }
            else
            {
              
              console.log(routeTo);
              console.log(pathnames.length);
              return;

            }
            // const isLast = index === pathnames.length -1;
            // return isLast? (
            //   <BreadcrumbItem className="text-decoration-none"  key={name}>{ name }</BreadcrumbItem>
            // ) : (<BreadcrumbItem className="text-decoration-none text-primary" style={{cursor:"pointer"}}  key={name} onClick={() => navigate(routeTo)}>{name}</BreadcrumbItem>)
           })
          }
</Breadcrumb>
        
</div>
        {/* <div className= "float-end d-flex align-items-top">
            <Collapse horizontal>
          <Alert
          style={{
        width: '500px'
          }}
         >
<Input type="search" placeholder="search"/>   
 </Alert>
            </Collapse> */}
            {/* <Navbar className="p-0">
              <Nav className="me-auto p-0" navbar>
                <UncontrolledDropdown nav direction="start">
                  <DropdownToggle nav className="p-0">
                    <NotificationsNoneOutlinedIcon/>
                    <Badge className="notif-badge bg-danger p-1 rounded-circle position-absolute d-inline-block"> 2</Badge>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>Notification 1</DropdownItem>
                    <DropdownItem>Notification 2</DropdownItem>
                    {/* <DropdownItem divider />
                    <DropdownItem></DropdownItem> */}
                  {/* </DropdownMenu>
                </UncontrolledDropdown>
              </Nav> */}
            {/* </Navbar>  */}
        {/* <div>
</div> */}

        {/* </div>*/}
        </Container> 
        </>
      );
}
 
export default Header;