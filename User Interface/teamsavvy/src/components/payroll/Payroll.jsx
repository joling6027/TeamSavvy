import React, { Component, useState, useMemo } from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
} from "react-router-dom";
import { usePagination, useTable } from 'react-table';
import '../../assets/css/bootstrap.min.css'
import './payroll.css'
import Paystub from './PayStub';




const Payroll = ({ columns, data }) => {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canPreviousPage,
        canNextPage,
        pageOptions,
        state,
        gotoPage,
        pageCount,
        setPageSize,
        prepareRow
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 2 }
        },
        usePagination
    );

    const { pageIndex, pageSize } = state;

    return (
        <>
            <div className='container'>
                <div className="card col-md-12 p-2 mb-5">
                    {/* <div className='col md-12'> */}
                    {/* <div className="card"> */}
                    <div className='card-header card-header-payroll'>
                        {/* <div className="tools float-right">
                            </div> */}
                        <h4 className='card-title' tag="h4">Paylips</h4>
                    </div>
                    <div className='card-body'>
                        <table className='table table-striped paylips-table mb-5'>
                            <thead className="text-primary">
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
                                <tr>
                                    <td className="text-center ">
                                        31-MAR-2022
                                    </td>
                                    <td className="text-center">Monthly</td>
                                    <td className="text-center">80</td>
                                    <td className="text-center">$3600</td>
                                    <td className="text-center">$3200</td>
                                    <td className="text-center view-file">
                                        <Link to={"/paystub"}>VIEW FILE</Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-center">
                                        28-FEB-2022
                                    </td>
                                    <td className="text-center">Monthly</td>
                                    <td className="text-center">80</td>
                                    <td className="text-center">$3600</td>
                                    <td className="text-center">$3200</td>
                                    <td className="text-center view-file">
                                        <Link to={"/paystub"}>VIEW FILE</Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-center">
                                        31-JAN-2022
                                    </td>
                                    <td className="text-center">Monthly</td>
                                    <td className="text-center">80</td>
                                    <td className="text-center">$3600</td>
                                    <td className="text-center">$3200</td>
                                    <td className="text-center view-file">
                                        <Link to={"/paystub"}>VIEW FILE</Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-center">
                                        31-JAN-2022

                                    </td>
                                    <td className="text-center">Monthly</td>
                                    <td className="text-center">80</td>
                                    <td className="text-center">$3600</td>
                                    <td className="text-center">$3200</td>
                                    <td className="text-center view-file">
                                        <Link to={"/paystub"}>VIEW FILE</Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-center">
                                        31-JAN-2022

                                    </td>
                                    <td className="text-center">Monthly</td>
                                    <td className="text-center">80</td>
                                    <td className="text-center">$3600</td>
                                    <td className="text-center">$3200</td>
                                    <td className="text-center view-file">
                                        <Link to={"/paystub"}>VIEW FILE</Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-center">
                                        31-JAN-2022

                                    </td>
                                    <td className="text-center">Monthly</td>
                                    <td className="text-center">80</td>
                                    <td className="text-center">$3600</td>
                                    <td className="text-center">$3200</td>
                                    <td className="text-center view-file">
                                        <Link to={"/paystub"}>VIEW FILE</Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-center">
                                        31-JAN-2022

                                    </td>
                                    <td className="text-center">Monthly</td>
                                    <td className="text-center">80</td>
                                    <td className="text-center">$3600</td>
                                    <td className="text-center">$3200</td>
                                    <td className="text-center view-file">
                                        <Link to={"/paystub"}>VIEW FILE</Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-center">
                                        31-JAN-2022

                                    </td>
                                    <td className="text-center">Monthly</td>
                                    <td className="text-center">80</td>
                                    <td className="text-center">$3600</td>
                                    <td className="text-center">$3200</td>
                                    <td className="text-center view-file">
                                        <Link to={"/paystub"}>VIEW FILE</Link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className='payroll-pagination'>
                            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                                {"<<"}
                            </button>{" "}
                            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                                Previous
                            </button>{" "}
                            <button onClick={() => nextPage()} disabled={!canNextPage}>
                                Next
                            </button>{" "}
                            <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                                {">>"}
                            </button>{" "}
                            <span>
                                Page{" "}
                                <strong>
                                    {pageIndex + 1} of {pageOptions.length}
                                </strong>{" "}
                            </span>
                            <span>
                                | Go to page:{" "}
                                <input
                                    type="number"
                                    defaultValue={pageIndex + 1}
                                    onChange={(e) => {
                                        const pageNumber = e.target.value
                                            ? Number(e.target.value) - 1
                                            : 0;
                                        gotoPage(pageNumber);
                                    }}
                                    style={{ width: "50px" }}
                                />
                            </span>{" "}
                            <select
                                value={pageSize}
                                onChange={(e) => setPageSize(Number(e.target.value))}
                            >
                                {[10, 25, 50].map((pageSize) => (
                                    <option key={pageSize} value={pageSize}>
                                        Show {pageSize}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='card-footer card-footer-payroll'>
                        {/* <h6>Rows per page</h6> */}
                        <div className="pagination_style">

                            {/* <Pagination>
                                    <PaginationItem>
                                        <PaginationLink
                                            aria-label="Previous"
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            <span aria-hidden={true}>
                                                <i
                                                    aria-hidden={true}
                                                    className="tim-icons icon-double-left"
                                                />
                                            </span>
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            1
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem className="active">
                                        <PaginationLink
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            2
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            3
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink
                                            aria-label="Next"
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            <span aria-hidden={true}>
                                                <i
                                                    aria-hidden={true}
                                                    className="tim-icons icon-double-right"
                                                />
                                            </span>
                                        </PaginationLink>
                                    </PaginationItem>
                                </Pagination> */}
                        </div>
                    </div>
                    {/* </div> */}
                    {/* </div> */}
                    {/* </Row> */}
                </div>
            </div>
        </>
    );
}

export default Payroll;