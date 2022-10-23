import React, { Component, useState  } from 'react';
import "../../assets/css/bootstrap.min.css";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import './header.css';
import {Link} from 'react-router-dom';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Alert, 
  Input
} from 'reactstrap';

import {
    Container
} from "reactstrap";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
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
  <BreadcrumbItem className="text-decoration-none"
  active
    tag="a"
  >
    Dashboard
  </BreadcrumbItem>
  {/* <BreadcrumbItem className="text-decoration-none"
    href="#"
    tag="a"
  >
    Library
  </BreadcrumbItem>
  <BreadcrumbItem className="text-decoration-none"
    href="#"
    tag="a"
  >
    Data
  </BreadcrumbItem>
  <BreadcrumbItem className="text-decoration-none"
    active
    tag="span"
  >
    Bootstrap
  </BreadcrumbItem> */}
</Breadcrumb>
        
        </div>
        <div className= "float-end d-flex align-items-top">
            {/* <span className="me-3"  onClick={function noRefCheck(){}}>
              <SearchOutlinedIcon/>
            </span> */}
            <Collapse horizontal>
          <Alert
          style={{
        width: '500px'
          }}
         >
<Input type="search" placeholder="search"/>   
 </Alert>
  </Collapse>
         
        <Navbar className="p-0">
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
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
      </Navbar>
      <div>
</div>

        </div>
        </Container>
        </>
      );
}
 
export default Header;