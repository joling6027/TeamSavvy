import React, { useState, useEffect, useMemo } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import AuthService from '../services/authService';
import {
    Link,
} from "react-router-dom";
import moment from 'moment/moment';
import '../../assets/css/bootstrap.min.css'
import './payroll.css'
import { GetEndPoints } from '../utilities/EndPoints';



const Payroll = () => {

    const [payrollItems, setPayrollItems] = useState();
    const { http, user } = AuthService();

    useEffect(() => {
        http.get(GetEndPoints().payrollList + "/" + user.employeeId).then((res) => {
            if (res.data.success) {
                setPayrollItems(res.data.response)
            }
        }).catch((err) => console.log(err.message));

    }, [])

    //currency formatter
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    })

    return (
        <>
            <div className='container'>
                <div className="card col-md-12 p-2 mb-5">
                    <div className='card-header card-header-payroll'>
                        <h4 className='card-title' tag="h4">Paylips</h4>
                    </div>
                    <div className='card-body overflow-auto pt-0'>
                        <table className='table table-striped paylips-table mb-5'>
                            <thead className="text-primary border-top border-bottom">
                                <tr>
                                    <th className="text-center" scope="col">Pay Date</th>
                                    <th className="text-center" scope="col">Pay Type</th>
                                    <th className="text-center" scope="col">Total Hours</th>
                                    <th className="text-center" scope="col">Earnings</th>
                                    <th className="text-center" scope="col">Net Pay(after taxes)</th>
                                    <th className="text-center" scope="col">File</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payrollItems && payrollItems.map((payrollItem) => (
                                    <tr key={payrollItem.payrollId}>
                                        <td className="text-center ">
                                            {moment(payrollItem.payDate).format('DD-MMM-YYYY')}
                                        </td>
                                        <td className="text-center">{payrollItem.payType}</td>
                                        <td className="text-center">{payrollItem.totalHours}</td>
                                        <td className="text-center">{formatter.format(payrollItem.earning)}</td>
                                        <td className="text-center">{formatter.format(payrollItem.netpay)}</td>
                                        <td className="text-center view-file">
                                            <Link 
                                                to={`/payroll/paystub/${payrollItem.payrollId}`}
                                                state={{payrollItem}}
                                            ><small>VIEW FILE</small></Link>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                    <div className='card-footer card-footer-payroll'>
                        <div className="pagination_style">
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Payroll;