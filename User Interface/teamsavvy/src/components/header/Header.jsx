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
              return;
            }
           })
          }
</Breadcrumb>
        
</div>
        </Container> 
        </>
      );
}
 
export default Header;