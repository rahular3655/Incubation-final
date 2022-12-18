import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import Header from "../components/Header";
// import Logo from "../components/Logo";
import { toast } from 'react-toastify';
import axios from "axios"
import {useNavigate} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';


function ApplicationForm() {
  const {user} = useContext(AuthContext)
  
  const Swal = require("sweetalert2")
  const Navigate=useNavigate()

  console.log(user.user_id)
  const [details, setDetails] = useState({
    user:user.user_id,
    fullname: "",
    phone: "",
    company_name: "",
    email: "",
    address: "",
    image: "",
    companyurl:"",
    TypeOfincubation:""
  });

  const onHandlechange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  const onRadsiochange = (e) => {
    setDetails({ ...details,TypeOfincubation:e.target.value});
  };
  const uploadData = (e) => {  
    e.preventDefault();
    console.log(details.image)
    
    const formSent = new FormData();
    for (let key in details) {
      formSent.append(key, details[key]);
    }
    
    axios.post('http://127.0.0.1:8000/user/newapplication/',formSent).then((response)=>{
      
      setDetails('')
      toast.success('Your Application is Submitted! ', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      Navigate('/')
      
  }).catch((error)=>{
    toast.success('Something went wrong !', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  })
  };
  return (
    <div>
      {/* <Logo /> */}
      <Header />
      <div className="form-container">
        <div className="h-100">
          <div className="justify-content-center h-100 align-items-center">
            <div className="content-body" style={{ paddingTop: "0" }}>
              <div className="container-fluid">
                <div className="row page-titles">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item active">
                      <a href="/">Form</a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="/">Validation</a>
                    </li>
                  </ol>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <div className="card">
                      <div className="card-header justify-content-center">
                        <h4 className="card-title">
                          <b>APPLICATION FOR INCUBATION</b>
                        </h4>
                      </div>

                      <div className="card-body">
                        <div className="form-validation">
                          <form
                            className="needs-validation"
                            onSubmit={uploadData}
                          >
                            <div className="row">
                              <div className="col-xl-12">
                                <div className="mb-3 row">
                                  <label
                                    className="col-lg-12 col-form-label text-black"
                                    htmlFor="validationCustom01"
                                  >
                                    Username
                                    <span className="text-danger">*</span>
                                  </label>
                                  <div className="col-lg-12">
                                    <input
                                    value={details.fullname}
                                      onChange={onHandlechange}
                                      name="fullname"
                                      type="text"
                                      className="form-control"
                                      id="validationCustom01"
                                      placeholder="Enter your Name.."
                                      required
                                    />
                                    <div className="invalid-feedback text-black">
                                      Please enter a username.
                                    </div>
                                  </div>
                                </div>
                                <div className="mb-3 row">
                                  <label
                                    className="col-lg-12 col-form-label text-black"
                                    htmlFor="validationCustom015"
                                  >
                                    CompanyName
                                    <span className="text-danger">*</span>
                                  </label>
                                  <div className="col-lg-12">
                                    <input
                                    value={details.company_name}
                                      onChange={onHandlechange}
                                      name="company_name"
                                      type="text"
                                      className="form-control"
                                      id="validationCustom015"
                                      placeholder="Enter your CompanyName.."
                                      required
                                    />
                                    <div className="invalid-feedback text-black">
                                      Please enter a CompanyName.
                                    </div>
                                  </div>
                                </div>
                                <div className="mb-3 row">
                                  <label
                                    className="col-lg-4 col-form-label text-black"
                                    htmlFor="validationCustom016"
                                  >
                                    Address
                                    <span className="text-danger">*</span>
                                  </label>
                                  <div className="col-lg-12">
                                    <input
                                    value={details.address}
                                      onChange={onHandlechange}
                                      name="address"
                                      type="text"
                                      className="form-control"
                                      id="validationCustom016"
                                      placeholder="Enter your Company Address.."
                                      required
                                    />
                                    <div className="invalid-feedback">
                                      Please enter Address.
                                    </div>
                                  </div>
                                </div>
                                <div className="mb-3 row">
                                  <label
                                    className="col-lg-12 col-form-label text-black"
                                    htmlFor="validationCustom02"
                                  >
                                    Email <span className="text-danger">*</span>
                                  </label>
                                  <div className="col-lg-12">
                                    <input
                                    value={details.email}
                                      onChange={onHandlechange}
                                      type="text"
                                      name="email"
                                      className="form-control"
                                      id="validationCustom02"
                                      placeholder="Your valid email.."
                                      required
                                    />
                                    <div className="invalid-feedback">
                                      Please enter a Email.
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-12">
                                <div className="mb-3 row">
                                  <label
                                    className="col-lg-12 col-form-label text-black"
                                    htmlFor="validationCustom07"
                                  >
                                    Company Website
                                    <span className="text-danger">*</span>
                                  </label>
                                  <div className="col-lg-12">
                                    <input
                                    value={details.companyurl}
                                      name="companyurl"
                                      onChange={onHandlechange}
                                      type="text"
                                      className="form-control"
                                      id="validationCustom07"
                                      placeholder="http://example.com"
                                      required
                                    />
                                    <div className="invalid-feedback">
                                      Please enter a url.
                                    </div>
                                  </div>
                                </div>
                                <div className="mb-3 row">
                                  <label
                                    className="col-lg-4 col-form-label text-black"
                                    htmlFor="validationCustom08" 
                                  >
                                    Phone
                                    <span className="text-danger">*</span>
                                  </label>
                                  <div className="col-lg-12">
                                    <input
                                    value={details.phone}
                                      onChange={onHandlechange}
                                      name="phone"
                                      type="text"
                                      className="form-control"
                                      id="validationCustom08"
                                      placeholder="212-999-0000"
                                      required
                                    />
                                    <div className="invalid-feedback">
                                      Please enter a phone no.
                                    </div>
                                  </div>
                                </div>
                                <div className="mb-5 row">
                                  <label className="col-lg-12 col-form-label text-black" >
                                    Type of Incubation Needed
                                    <span className="text-danger">*</span>
                                  </label>
                                  <div className="col-lg-12" >
                                    <div className="">
                                      <input
                                      onChange={onRadsiochange}
                                        className="form-check-input"
                                        type="radio"
                                        name="TypeOfincubation"
                                        value="Virtual Incubation"
                                        required
                                      />
                                      <label className="form-check-label text-black">
                                        Virtual Incubation
                                      </label>
                                    </div>
                                    <div className="">
                                      <input
                                     onChange={onRadsiochange}
                                        className="form-check-input"
                                        type="radio"
                                        name="TypeOfincubation"
                                        value="Physical Incubation"
                                        required
                                      />
                                      <label className="form-check-label text-black">
                                      Physical Incubation
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="mb-3 row">
                                  <div className="col-lg-12 ms-auto">
                                    <button
                                      type="submit"
                                      className="btn  btn-primary col-lg-12"
                                    >
                                      Submit
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicationForm;
