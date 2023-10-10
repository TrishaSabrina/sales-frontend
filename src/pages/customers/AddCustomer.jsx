import React, { useState } from 'react';
import BackBtn from '../../components/images/backbtn.png';
import axios from 'axios';

import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCustomer = () => {

    const [customers, setcustomers] = useState({
        Code : '',
        Name:'',
        Address:''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setcustomers((prevcustomersData) => ({
            ...prevcustomersData,
            [name]: value,
        }));
    };

    const formSubmit = (e) => {
        e.preventDefault();

        const obj = {
            Code: e.target.Code.value,
            // isactive: customers.isactive,
            Name: e.target.Name.value,
            Address: e.target.Address.value,
          
        };



        if (obj.Code == '') {
            fieldCheck("Please enter Code");
            document.getElementById("Code").focus();
            return true;
        }

        if (obj.Name == '') {
            fieldCheck("Please enter Name");
            document.getElementById("Name").focus();
            return true;
        }

        if (obj.Address == '') {
            fieldCheck("Please enter Address");
            document.getElementById("Address").focus();
            return true;
        }




        //axios
        axios.post("http://127.0.0.1:8000/customers/", obj)
            .then((result) => {
                successnotify()
            }).catch((error) => {
                unsuccessnotify()
            })


    }

    const successnotify = () => toast.success("Added Successfully !", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    const unsuccessnotify = () => toast.error("Not Added. Try again !", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const fieldCheck = (msg) => toast.error(msg, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });


    return (
        <>
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0"><Link to="/customers" ><img src={BackBtn} style={{ height: "50px", width: "80px" }} /></Link><span></span></h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    {/* <li className="breadcrumb-item"><a href="#">Home</a></li> */}
                                    <li className="breadcrumb-item active">customers</li>
                                    <li className="breadcrumb-item active">Add customers</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-3">


                            </div>
                            <div className="col-6">

                                <div className="card card-info">
                                    <div className="card-header">
                                        <h3 className="card-title">Add new Customer</h3>
                                    </div>
                                    <form onSubmit={formSubmit}>
                                        <div className="card-body">
                                            <div className="form-group">
                                                {/* <label htmlFor="exampleInputEmail1">Full Name</label> */}
                                                <label><b>Code</b></label>
                                                <input type="text" className="form-control form-control-border" id="Code"
                                                    placeholder="Code here"
                                                    name="Code"
                                                    value={customers.Code}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="form-group">
                                                {/* <label htmlFor="exampleInputEmail1">Full Name</label> */}
                                                <label><b>Name</b></label>
                                                <input type="text" className="form-control form-control-border" id="Name"
                                                    placeholder="Name here"
                                                    name="Name"
                                                    value={customers.Name}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="form-group">
                                                {/* <label htmlFor="exampleInputEmail1">Full Name</label> */}
                                                <label><b>Address</b></label>
                                                <input type="text" className="form-control form-control-border" id="Address"
                                                    placeholder="Address here"
                                                    name="Address"
                                                    value={customers.Address}
                                                    onChange={handleChange}
                                                />
                                            </div>



                                        </div>
                                        <div className="card-footer">
                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>


                         


                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer />

        </>
    );

};
export default AddCustomer;