import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import '../../assets/css/bootstrap.min.css'
import './payroll.css'

const Paystub = ({ data }) => {

  console.log('payroll -')
  console.log(data)
  const location = useLocation();
  // const history = userHistory();
  // const { payrollItem = '1' } = location.state || {}
  useEffect(() => {

  })

  console.log(location)
  return (
    <>
      <div className="container">
        <div className="card col-md-12 mb-5">
          <div className='card-header'>
            <div className="row">
              <h5 className="title col-sm">Joling Weng</h5>
              <h5 className="title col-sm">Employee#300335548</h5>
              <h5 className="title col-sm">Department: IT</h5>
              <h5 className="title col-sm text-right">Start Date  1-Jan-2022</h5>
              <h5 className="title col-sm text-right">End Date  </h5>
            </div>
            <hr />
          </div>
          <div className='card-body'>
            <div className="row">
              <div className="col-8">
                <h5>Address</h5>
                <p>12546, 56 Ave
                  Surrey, BC, H76Y76</p>
              </div>
              <div className="col-4">
                <h5>Organization</h5>
                <p>Organization name
                  1868, XYZ road,
                  Ontario, ON, D54F54</p>
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
                      Hours
                    </th>
                    <th>
                      Rate
                    </th>
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
                      Reg Hours
                    </th>
                    <td>
                      80
                    </td>
                    <td>
                      23
                    </td>
                    <td>
                      1840
                    </td>
                    <td>
                      3800
                    </td>
                  </tr>
                  <tr>
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
                  </tr>
                  <tr>
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
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="paystub-inner-card">
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
            </div>
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
                      $3100
                    </td>
                    <td>
                      1240-1102-1111
                    </td>
                    <td>
                      CIBC
                    </td>
                  </tr>
                  <tr>
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
                  </tr>
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

export default Paystub;