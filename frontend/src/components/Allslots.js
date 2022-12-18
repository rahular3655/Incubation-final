import React, { useEffect, useReducer, useState ,useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import Header from "../components/Header";
import AdminSideBar from "../components/AdminSideBar";
import AuthContext from "../context/AuthContext";

function AllSlots() {
    const Swal = require("sweetalert2");
    const {authTokens} = useContext(AuthContext)
    const [slots, setSlots] = useState([]);
    const [applicant, setApplicant] = useState([]);
    const [slotid, setSlotId] = useState("")
    const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0)


    useEffect(() => {
        // to get approved applications
      
        axios.get("http://127.0.0.1:8000/user/approved/",{
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${
                    authTokens.access
                }`
            }
        }).then((response) => {
            setApplicant(response.data)
        })
    }, []);

    // booking the slot
    const AssignSlot = (userid) => {
        console.log(slotid, 'slottttttttttttttttttttttttttt')
        console.log(userid, 'userrrrrrr')
        axios.post("http://127.0.0.1:8000/user/allotslot/" , { slotid: slotid, applicantid: userid },{
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${
                        authTokens.access
                    }`
                }
            })
            .then((response) => {
                console.log("responsee", response.data);
            })
        forceUpdate()

    }


    // showing all the slots
    const loadSlot = async () => {
        await axios
            .get("http://127.0.0.1:8000/user/allslot/",{
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${
                        authTokens.access
                    }`
                }
            })
            .then((response) => setSlots(response.data));

    }
    //creating slots
    const CreateSlot = () => {
        axios
            .post("http://127.0.0.1:8000/user/createslot/",{
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${
                        authTokens.access
                    }`
                }
            })
            .then((response) => {
            })
        forceUpdate()
    }

    useEffect(() => {
        loadSlot()
    }, [reducerValue,slotid])



    return (
        <div>
            <Header />
            <AdminSideBar />
            <div className="content-body">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title"><b>SLOTS AVAILABILITY</b> </h4>
                                    <button onClick={CreateSlot} type="button" className="btn btn-primary btn-sm">ADD SLOT<span className="btn-icon-end"><i className="fa fa-check"></i></span>
                                    </button>
                                </div>
                                <div className="card-body pb-1">
                                    <div id="lightgallery" className="row"  >

                                        {slots.map((data, id) => {
                                            return (
                                                <>
                                                    <div className="col-xl-3 col-xxl-3 col-sm-6" key={id} >
                                                        <div className=" overflow-hidden mt-3 mb-5" >
                                                            <div className={` text-center pt-5 ${data.is_available === true ? `bg-warning bg-gradient ` : `bg-primary bg-gradient`} `} style={{ width: "49%"}}>
                                                                <span >
                                                                    {data.is_available === true ?
                                                                        <button data-bs-toggle="modal" onClick={() => setSlotId(data.id)} data-bs-target="#exampleModalCenter" type="button" className="btn btn-dark btn-sm mb-5" style={{ background: "black" }}><i className="fa fa-plus"></i>
                                                                        </button> : <button type="button" className="btn btn-rounded btn-dark btn-sm mb-5" onClick={() => Swal.fire("Already Booked")} style={{ background: "black" }}><i className="fa fa-check "></i>
                                                                        </button>}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="modal fade" id="exampleModalCenter">
                                                        <div className="modal-dialog modal-dialog-centered" role="document">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h5 className="modal-title">ALLOT SLOT</h5>
                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal">
                                                                    </button>
                                                                </div>
                                                                <div className="modal-body">

                                                                    <div>
                                                                        <div className="card border-0 pb-0">
                                                                            <div className="card-header border-0 pb-0">
                                                                                <h4 className="card-title">APPROVED APPLICATIONS</h4>
                                                                            </div>
                                                                            <div className="card-body">
                                                                                <div id="DZ_W_Todo3" className="widget-media dz-scroll height370">
                                                                                    <ul className="timeline">
                                                                                        {applicant.map((list, id) => {
                                                                                            return (

                                                                                                <li key={id}>
                                                                                                    {!list.allotted &&
                                                                                                    
                                                                                                            <div className="timeline-panel d-flex">
                                                                                                                <div className="media-body" >
                                                                                                                    <h5 className="mb-1"> {list.company_name} <small className="text-muted">{list.date}</small></h5>
                                                                                                                    <p className="mb-1"><strong>#{list.id}</strong> by <strong>{list.fullname}</strong>{list.email}
                                                                                                                    </p>
                                                                                                                </div>
                                                                                                                <a data-bs-dismiss="modal" onClick={() => AssignSlot(list.id)} className="btn btn-primary btn-xxs shadow">ALLOT SLOT</a>
                                                                                                            </div>

                                                                                                    }
                                                                                                </li>

                                                                                            )
                                                                                        })}
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>                                                </>
                                            )
                                        })}
                                        <br />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllSlots