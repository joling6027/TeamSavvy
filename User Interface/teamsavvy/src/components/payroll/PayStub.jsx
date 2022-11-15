import React from "react";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import AuthService from '../services/authService';
import { GetEndPoints } from "../utilities/EndPoints";
import moment from 'moment/moment';
import '../../assets/css/bootstrap.min.css'
import './payroll.css'

const Paystub = () => {
  // console.log(props)
  const { http, user } = AuthService();
  const [emp, setEmployee] = useState();
  const data = useLocation();
  const [payrollItem, setPayrollItem] = useState();

  console.log(data.state.payrollItem)
  
  // console.log(data.state.payrollItem)
  useEffect(() => {
    http.get(GetEndPoints().employee + "/" + user.employeeId).then((res) => {

      const response = res.data.response
      setEmployee(response)
      console.log(response)
      setPayrollItem(data.state.payrollItem)
      
    }).catch((err) => console.log(err.message));

  }, [])

  console.log(emp)

  if(emp === undefined){
    return (<div class="d-flex justify-content-center">
    <div class="spinner-grow text-success" style={{width: "3rem", height: "3rem"}} role="status">
    <span class="sr-only">Loading.....</span>
    </div>
</div>);
  }else{

  return (
    <>
      <div className="container">
        <div className="card col-md-12 mb-5">
          <div className='card-header'>
            <div className="row">
              <h5 className="title col-sm">{emp.employeeFirstname} {emp.employeeLastname}</h5>
              <h5 className="title col-sm">Employee#{emp.employeeId}</h5>
              <h5 className="title col-sm">Department: {emp.department.departmentName}</h5>
              <h5 className="title col-sm text-right">Start Date  {moment(emp.payDate).format('DD-MMM-YYYY')}</h5>
              <h5 className="title col-sm text-right">End Date  </h5>
            </div>
            <hr />
          </div>
          <div className='card-body'>
            <div className="row">
              <div className="col-8">
                <h5>Address</h5>
                <p>{emp.address.apartment}, {emp.address.city.cityName}, {emp.address.city.province.provinceAbbr}, {emp.address.postcode}</p>
              </div>
              <div className="col-4">
                <h5>Organization</h5>
                <p>{emp.jobLocation.location}, {emp.jobLocation.city.cityName}, {emp.jobLocation.city.province.provinceAbbr}, {emp.jobLocation.postcode}</p>
                <p></p>
              </div>
              <hr />
            </div>
            <div className="paystub-inner-card">
              <h6 className='paystub-inner-table-caption'>EARNINGS</h6>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>
                      Type
                    </th>
                    <th>
                      Total Working days
                    </th>
                    {/* <th>
                      Rate
                    </th> */}
                    <th>
                      Amount
                    </th>
                    <th>
                      YTD
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      {payrollItem.payType}
                    </th>
                    <td>
                      80
                    </td>
                    {/* <td>
                      23
                    </td> */}
                    <td>
                      ${payrollItem.netpay}
                    </td>
                    <td>
                      ${payrollItem.payYtd}
                    </td>
                  </tr>
                  {/* <tr>
                    <th scope="row">
                      Sick
                    </th>
                    <td>
                      6.0
                    </td>
                    <td>
                      20
                    </td>
                    <td>
                      180
                    </td>
                    <td>
                      350
                    </td>
                  </tr> */}
                  {/* <tr>
                    <th scope="row">
                      Vac Pay
                    </th>
                    <td>
                      0.00
                    </td>
                    <td>
                      30.00
                    </td>
                    <td>
                      30.00
                    </td>
                    <td>
                      30.00
                    </td>
                  </tr> */}
                </tbody>
              </table>
            </div>
            {/* <div className="paystub-inner-card">
              <h6 className='paystub-inner-table-caption'>NET</h6>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>
                      Summary
                    </th>
                    <th>
                      Gross Pay
                    </th>
                    <th>
                      Deductions
                    </th>
                    <th>
                      Net Pay
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      Current
                    </th>
                    <td>
                      3800
                    </td>
                    <td>
                      500
                    </td>
                    <td>
                      3200
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      Year to Date
                    </th>
                    <td>
                      20000
                    </td>
                    <td>
                      3500
                    </td>
                    <td>
                      16500
                    </td>
                  </tr>
                </tbody>
              </table>
            </div> */}
            <div className="paystub-inner-card">
              <h6 className='paystub-inner-table-caption'>PAY DISTRIBUTION</h6>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>
                      Type
                    </th>
                    <th>
                      Amount
                    </th>
                    <th>
                      Account#
                    </th>
                    <th>
                      Bank
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      Electronic bank transfers
                    </th>
                    <td>
                      ${payrollItem.netpay}
                    </td>
                    <td>
                      {emp.bankaccount}
                    </td>
                    <td>
                      {emp.bankname}
                    </td>
                  </tr>
                  {/* <tr>
                    <th scope="row">
                      Electronic bank transfer
                    </th>
                    <td>
                      $3000
                    </td>
                    <td>
                      1240-1102-1111
                    </td>
                    <td>
                      RBC
                    </td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
    )
  }
}

export default Paystub;