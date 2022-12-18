import React, { useEffect, useState, useContext } from 'react'
import Header from '../components/Header'
import AdminSideBar from '../components/AdminSideBar'
import AuthContext from '../context/AuthContext';
import axios from "axios";

function AllotedApplications() {
    const [data, setData] = useState([])
    const Swal = require("sweetalert2")
    const { viewdetail, viewDetails } = useContext(AuthContext)
    const {authTokens} = useContext(AuthContext)

    console.log(data, "ssssssssssssssssss")
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/user/applications/",{
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${
                    authTokens.access
                }`
            }
        }).then((response) => {
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
                                    <h3 className="card-title"><strong> ALLOTTED APPLICATIONS</strong></h3>
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
                                                       
                                                       
                                                            <tr key={id}>
                                                            {list.allotted &&
                                                             <>
                                                                <td><strong>{id + 1}</strong></td>
                                                                <td>{list.date}</td>
                                                                <td><a>
                                                                    <strong>#{list.id}</strong></a> by <strong>{list.fullname}</strong><br /><a >{list.email}</a><br />
                                                                    {list.company_name}
                                                                </td>
                                                                <td><span onClick={() => viewDetails(list.id)} data-bs-toggle="modal" data-bs-target="#exampleModalCenter" className="btn btn-rounded btn-primary btn-xxs">View</span></td>
                                                                <td><button className="btn btn-rounded btn-info btn-xxs">{list.status}</button></td>
                                                                <td><span className="btn btn-rounded btn-primary btn-xxs">Completed<span
                                                                    className="ms-1 fa fa-check"></span></span>
                                                                </td>
                                                                  </>
                                                                }
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
                        <div className="modal-body ">
                            <div class="dz-image-bx rounded d-flex justify-content-around">
                                <div class="dz-info">
                                    <h5>{viewdetail && viewdetail.company_name}</h5>
                                    <p className='text-primary'>Applied on:{viewdetail && viewdetail.date}</p>
                                    <b>Details:</b>
                                    <a>
                                        <strong>#{viewdetail && viewdetail.id}</strong></a> by <strong>{viewdetail && viewdetail.fullname}</strong><br /><a >{viewdetail.email}</a><br />
                                    {viewdetail && viewdetail.company_name} <br />
                                    Status:<button className={viewdetail && viewdetail.status === "Pending" ? "btn btn-rounded btn-dark  btn-xxs ms-2" : viewdetail && viewdetail.status === "DECLINED" ? "btn btn-rounded btn-danger btn-xxs ms-2" : viewdetail && viewdetail.status === "APPROVED" ? "btn btn-rounded btn-success btn-xxs ms-2" : "btn btn-rounded btn-info btn-xxs ms-2"}>{viewdetail && viewdetail.status}</button>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" data-bs-dismiss="modal" className="btn btn-danger light">Close</button>
                        </div>
                    </div>

                </div>
            </div></div>
    )
}

export default AllotedApplications