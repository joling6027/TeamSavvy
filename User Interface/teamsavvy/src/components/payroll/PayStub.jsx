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
  const [payrollItem, setPayrollItem] = useState(data.state.payrollItem);
  const [endDate, setEndDate] = useState();

  // console.log(data.state.payrollItem)

  const calcLastDateOfMonth = (payDate) => {
    let datePayDate = new Date(payDate);
    console.log(datePayDate)
    datePayDate.setMonth(datePayDate.getMonth() + 1);
    datePayDate.setDate(0);
    console.log(datePayDate);
    let endDateStr = moment(datePayDate).format("YYYY-MM-DD")
    setEndDate(endDateStr);
  }
  
  // console.log(data.state.payrollItem)
  useEffect(() => {
    http.get(GetEndPoints().employee + "/" + user.employeeId).then((res) => {

      const response = res.data.response
      setEmployee(response)
      console.log(response)
      // setPayrollItem(data.state.payrollItem)
      console.log(data.state.payrollItem)
      calcLastDateOfMonth(payrollItem.payDate)
      
    }).catch((err) => console.log(err.message));

  }, [])

  if(emp === undefined || payrollItem === undefined){
    return (<div class="d-flex justify-content-center">
    <div class="spinner-grow text-success" style={{width: "3rem", height: "3rem"}} role="status">
    <span class="sr-only">Loading.....</span>
    </div>
</div>);
  }else{

  return (
    <>
      <div className="px-3">
        <div className="card col-md-12 mb-5">
          <div className='pt-3 px-3'>
            <div className="d-md-flex justify-content-between d-sm-block">
              <p className="title col-sm-12 col-md-2 m-0"><strong>{emp.employeeFirstname} {emp.employeeLastname}</strong></p>
              <p className="title col-sm-12 col-md-2 m-0">Employee# <strong>{emp.employeeId}</strong></p>
              <p className="title col-sm-12 col-md-2 m-0">Department: <strong>{emp.department.departmentName}</strong></p>
              <p className="title col-sm-12 col-md-2 m-0 text-right">Start Date:<strong> {payrollItem.payDate}</strong></p>
              <p className="title col-sm-12 col-md-2 m-0 text-md-end text-sm-start">End Date: <strong>{endDate}</strong></p>
            </div>
            <hr />
          </div>
          <div className='px-3 pt-0 '>
            <div className="d-md-flex d-sm-block">
              <div className="col-md-8 col-sm-12">
                <p className="m-0">Address</p>
                <p className="text-muted">{emp.address.apartment}, {emp.address.city.cityName}, {emp.address.city.province.provinceAbbr}, {emp.address.postcode}</p>
              </div>
              <div className="col-md-3 col-sm-12">
                <p  className="m-0">Organization</p>
                <p className="text-muted">{emp.jobLocation.location}, {emp.jobLocation.city.cityName}, {emp.jobLocation.city.province.provinceAbbr}, {emp.jobLocation.postcode}</p>
                <p></p>
              </div>
              <hr />
            </div>
            <div className="paystub-inner-card pt-3 mt-2">
              <p className='paystub-inner-table-caption'>EARNINGS</p>
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
            <div className="paystub-inner-card pt-3 mt-2">
              <p className='paystub-inner-table-caption'>PAY DISTRIBUTION</p>
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
                    <td className="account">
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