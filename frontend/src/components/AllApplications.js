import React, { useEffect, useState, useContext } from 'react'
import Header from '../components/Header'
import AdminSideBar from '../components/AdminSideBar'


import axios from "axios";
import AuthContext from '../context/AuthContext';

function AllApplications() {
    const [data, setData] = useState([])
    const Swal = require("sweetalert2")
    const { viewdetail, viewDetails } = useContext(AuthContext)


    console.log(data, "ssssssssssssssssss")
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/user/applications/").then((response) => {
            setData(response.data)
        })
    }, []);

    return (
        <div>

            <Header />
            <AdminSideBar />
            <div className='content-body'>
                <div className='container-fluid'>
                    <div className="col-lg-12">
                        {data.length === 0 ? (<div className="card">

                            <div className="card-header justify-content-center">
                                <h2 className="card-title"><strong>NO  APPLICATIONS AVAILABLE</strong></h2>
                            </div></div>) : (
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title"><strong> ALL APPLICATIONS</strong></h3>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-responsive-md">
                                            <thead>
                                                <tr>
                                                    <th ><strong>#</strong></th>
                                                    <th><strong>DATE</strong></th>
                                                    <th><strong>DETAILS</strong></th>
                                                    <th><strong>VIEW</strong></th>
                                                    <th><strong>STATUS</strong></th>
                                                    <th><strong>ACTIONS</strong></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.map((list, id) => {
                                                    return (
                                                        <>
                                                            <tr>
                                                                <td><strong>{id + 1}</strong></td>
                                                                <td>{list.date}</td>
                                                                <td><a >
                                                                    <strong className='text-black'>#{list.id}</strong></a> by <strong className='text-black'>{list.fullname}</strong><br /><a  className='text-black'>{list.email}</a><br />
                                                                    {list.company_name}
                                                                </td>
                                                                <td><span onClick={() => viewDetails(list.id)} data-bs-toggle="modal" data-bs-target="#exampleModalCenter" className="btn">View</span></td>
                                                                <td><button className={list.status === "Pending" ? "btn btn-rounded btn-light btn-xxs ms-2" : list.status === "Declined" ? "btn btn-rounded btn-danger btn-xxs" : list.status === "Approved" ? "btn btn-rounded btn-success btn-xxs text-black" : "btn btn-rounded btn-info btn-xxs"}>{list.status}</button></td>
                                                                <td>{list.allotted === true || list.status === "Declined" ? <span className="btn btn-rounded btn-primary btn-xxs">Completed<span
                                                                    className="ms-1 fa fa-check"></span></span> : <span className="btn btn-rounded btn-primary btn-xxs">Processing<span
                                                                        className="ms-1 fa fa-redo"></span></span>}
                                                                </td>
                                                            </tr>

                                                        </>
                                                    )
                                                })}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>


                            </div>)}

                    </div>

                </div>

            </div>
            <div className="modal fade" id="exampleModalCenter">
                <div className="modal-dialog modal-dialog-centered" role="document">

                    <div className="modal-content">
                        <div className="modal-header text-center">
                            <h5 className="modal-title">{viewdetail && viewdetail.company_name} </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal">
                            </button>
                        </div>
                        <div className="modal-body ">
                            <div class="dz-image-bx rounded d-flex justify-content-around">
                                {/* <div class="dz-media active me-3">
                                    <img class="rounded" src={`http://127.0.0.1:8000${viewdetail.image}`} alt="" style={{
                                        height: "7.5rem",
                                        width: "8.5rem"
                                    }} />
                                </div> */}
                                <div class="dz-info">
                                    <h5>{viewdetail && viewdetail.company_name}</h5>
                                    <p className='text-primary'>Applied on:{viewdetail && viewdetail.date}</p>
                                    <b className='text-black' >Details:</b>
                                    <a className='text-black'>
                                        <strong className='text-black' >#{viewdetail && viewdetail.id}</strong></a> by <strong className='text-black'>{viewdetail && viewdetail.fullname}</strong><br /><a className='text-black'>{viewdetail.email}</a><br />
                                    {viewdetail && viewdetail.company_name} <br />
                                    Status:<button className={viewdetail && viewdetail.status === "Pending" ? "btn btn-rounded btn-danger btn-xxs ms-2" : viewdetail && viewdetail.status === "Declined" ? "btn btn-rounded btn-danger btn-xxs ms-2" : viewdetail && viewdetail.status === "Approved" ? "btn btn-rounded btn-success btn-xxs ms-2" : "btn btn-rounded btn-info btn-xxs ms-2"}>{viewdetail && viewdetail.status}</button>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" data-bs-dismiss="modal" className="btn btn-danger light">Close</button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )

}

export default AllApplications