import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import "./Profile.css";
import propic from '../img/1.png'
import Header from '../components/Header'


function Profile() {
    const [userApplications, setuserApplications] = useState([])
    const { user, logoutUser } = useContext(AuthContext)
    const { viewdetail, viewDetails } = useContext(AuthContext)

    useEffect(() => {
        const id = user.user_id
        axios.post(`http://127.0.0.1:8000/user/userapplication/${id}/`).then((response) => {
            setuserApplications(response.data)

        })
    }, [])

    console.log(userApplications.user, 'ooooooooooooooooooooo')
    return (

        <div>
            <Header />
            <div className='content-body' style={{ marginLeft: "13.437rem", marginRight: "10rem" }} >
                <div className='container-fluid'>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="profile card card-body px-3 pt-3 pb-0">
                                <div className="profile-head">
                                    
                                    <div className="profile-info">
                                        <div className="profile-photo">
                                            <img src={propic} className="img-fluid rounded-circle" alt="Profile" />
                                        </div>
                                        <div className="profile-details">
                                            <div className="profile-name px-3 pt-2">
                                                <h4 className="text-primary mb-0">{user.username}</h4>
                                                <p>you have {userApplications && (userApplications).length} Applications</p>

                                            </div>
                                            <div className="profile-email px-2 pt-2">
                                                <h4 className="text-muted mb-0">UserID</h4>
                                                <p><b>#{user.user_id}</b> </p>
                                            </div>
                                            <div className="dropdown ms-auto text-end">
                                                <div className="btn-link" data-bs-toggle="dropdown">
                                                    <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="5" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="19" cy="12" r="2"></circle></g></svg>
                                                </div>
                                                <div className="dropdown-menu dropdown-menu-end">
                                                    <a onClick={logoutUser} className="dropdown-item">Logout</a>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12">

                        {userApplications.length === 0 ? (<div className="card">
                            <div className="card-header justify-content-center">
                                <h2 className="car`Q-title"><strong>NO  APPLICATIONS AVAILABLE</strong></h2>
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
                                                    <th><strong>PROGRESS</strong></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {userApplications.map((list, id) => {
                                                    return (
                                                        <tr key={id}>
                                                            <td><strong>{id + 1}</strong></td>
                                                            <td>{list.date}</td>
                                                            <td><a>
                                                                <strong>#{list.id}</strong></a> by <strong>{list.fullname}</strong><br /><a >{list.email}</a><br />
                                                                {list.company_name}
                                                            </td>
                                                            <td><span onClick={() => viewDetails(list.id)} data-bs-toggle="modal" data-bs-target="#exampleModalCenter" className="btn btn-rounded btn-primary btn-xxs">View</span></td>
                                                            <td><span className={list.status === "Pending" ? "btn btn-rounded btn-dark  btn-xxs" : list.status === "Declined" ? "btn btn-rounded btn-danger btn-xxs" : list.allotted === true ? "btn btn-rounded btn-info btn-xxs" : list.status === "Approved" ? "btn btn-rounded btn-success btn-xxs" : null}>{list.allotted === true ? "Alotted" : list.status}</span></td>
                                                            <td>{list.allotted === true || list.status === "Declined" ? <span className="btn btn-rounded btn-primary btn-xxs">Completed<span
                                                                className="ms-1 fa fa-check"></span></span> : <span className="btn btn-rounded btn-primary btn-xxs">Processing<span
                                                                    className="ms-1 fa fa-redo"></span></span>}
                                                            </td>
                                                            <td>
                                                                <div className="progress" style={{ background: "rgba(127, 99, 244, .1)" }}>
                                                                    <div className={list.allotted == true ? "progress-bar allotted text-warning" : list.status === "Declined" ? "progress-bar denied" : list.status === "Approved" ? "progress-bar approved" : list.status === "Pending" ? "progress-bar pending" : null} role="progressbar"><span className="sr-only"></span>
                                                                    </div>
                                                                </div>
                                                            </td>
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
                            <p className='text-black'>Applied on:{viewdetail && viewdetail.date}</p>
                            <b className='text-black'>Details:</b>
                            <a>
                                <strong className='text-black'>#{ viewdetail && viewdetail.id}</strong></a> by <strong className='text-black'>{viewdetail && viewdetail.fullname}</strong><br /><a className='text-black' >{viewdetail.email}</a><br />
                            {viewdetail && viewdetail.company_name} <br />
                            Stats:<span className="btn btn-rounded btn-primary btn-xxs text-black">{viewdetail && viewdetail.status}</span>
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

export default Profile