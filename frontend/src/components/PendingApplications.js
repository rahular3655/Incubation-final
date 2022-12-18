import React, { useEffect, useState, useContext } from 'react'
import Header from '../components/Header'
import AdminSideBar from '../components/AdminSideBar'
import axios from "axios";
import AuthContext from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function PendingApplications() {
    const [data, setData] = useState([])
    const Swal = require("sweetalert2")
    const {viewdetail, viewDetails } = useContext(AuthContext)
    const {authTokens} = useContext(AuthContext)

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/user/pending/",{
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${
                    authTokens.access
                }`
            }
        }).then((response) => {
            setData(response.data)

        })
        console.log(data, "ssssssssssssssssss")

    }, []);



    const approveList = (id) => {
        console.log(authTokens.access)
        Swal.fire({
            title: "Are you sure ",
            text: " you want to approve the Application?",
            icon: "success",
            showCancelButton: "true",
            confirmButtonColor: "#3085D6",
            cancelButtonColor: "#d33",
            confirmButtonText: "YES,Approve",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.get(`http://127.0.0.1:8000/user/approve/${id}/`,{
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${
                            authTokens.access
                        }`
                    }
                }).then(() => {
                    toast.info('Application Approved!', {
                        position: "top-right",
                        autoClose: 6000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });

                    window.location.reload()
                }).catch((error)=> console.log(error))
            }
        })
        console.log(data)
    }

    const declineList = (id) => {
        Swal.fire({
            title: "Are you sure",
            text: "you want to decline the Application?",
            icon: "warning",
            showCancelButton: "true",
            confirmButtonColor: "#3085D6",
            cancelButtonColor: "#d33",
            confirmButtonText: "YES,Reject",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(`http://127.0.0.1:8000/user/reject/${id}/`,{
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${
                            authTokens.access
                        }`
                    }
                }).then(() => {
                    toast.info('Application Rejected!', {
                        position: "top-right",
                        autoClose: 6000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    window.location.reload()

                })


            }
        })
    }
    return (
        <div>
            <Header />
            <AdminSideBar />
            <div className='content-body'>
                <div className='container-fluid'>
                    <div className="col-lg-12">
                        {data.length === 0 ? (<div className="card">

                            <div className="card-header justify-content-center">
                                <h2 className="card-title"><strong>NO PENDING APPLICATIONS LEFT</strong></h2>
                            </div></div>) : (<div className="card">

                                <div className="card-header bg-info">
                                    <h4 className="card-title"><strong>PENDING APPLICATIONS</strong></h4>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-responsive-md">
                                            <thead>
                                                <tr>
                                                    <th><strong>#</strong></th>
                                                    <th><strong>DATE</strong></th>
                                                    <th><strong>DETAILS</strong></th>
                                                    <th><strong>VIEW</strong></th>
                                                    <th><strong>STATUS</strong></th>
                                                    <th><strong>APPROVE</strong></th>
                                                    <th><strong>DECLINE</strong></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.map((list, id) => {
                                                    return (
                                                        <tr key={id}>
                                                            <td><strong>{id + 1}</strong></td>
                                                            <td>{list.date}</td>
                                                            <td><a>
                                                                <strong>#{list.id}</strong></a> by <strong>{list.fullname}</strong><br /><a >{list.email}</a><br />
                                                                {list.company_name}
                                                            </td>
                                                            <td><span onClick={() => viewDetails(list.id)} data-bs-toggle="modal" data-bs-target="#exampleModalCenter" className="btn">View</span></td>
                                                            <td><span className="badge  badge-dark">{list.status}</span></td>
                                                            <td><span className="badge  badge-success" onClick={() => approveList(list.id)}>Approve</span></td>
                                                            <td><span className="badge  badge-danger" onClick={() => declineList(list.id)}>Decline</span></td>
                                                        </tr>
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
                        <div className="modal-body text-center ">
                            <div class="dz-image-bx rounded d-flex justify-content-around">
                                <div class="dz-info">
                                    <h5>{viewdetail && viewdetail.company_name}</h5>
                                    <p className='text-primary'>Applied on:{viewdetail && viewdetail.date}</p>
                                    <b className='text-black'>Details:</b>
                                    <a>
                                        <strong className='text-black'>#{viewdetail && viewdetail.id}</strong></a> <span className='text-black'>by </span> <strong className='text-black'>{viewdetail && viewdetail.fullname}</strong><br /><a className='text-black'>{viewdetail.email}</a><br />
                                    <span className='text-black'>{viewdetail && viewdetail.company_name}</span> <br />
                                    <span className='text-black'>Status:</span><button className={viewdetail && viewdetail.status === "Pending" ? "btn btn-rounded btn-dark  btn-xxs ms-2" : viewdetail && viewdetail.status === "DECLINED" ? "btn btn-rounded btn-danger btn-xxs ms-2" : viewdetail && viewdetail.status === "APPROVED" ? "btn btn-rounded btn-success btn-xxs ms-2" : "btn btn-rounded btn-info btn-xxs ms-2"}>{viewdetail && viewdetail.status}</button>                                              

                                   
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

export default PendingApplications