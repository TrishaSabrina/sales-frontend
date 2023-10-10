import React, { useState } from 'react';
import BackBtn from '../../components/images/backbtn.png';
import axios from 'axios';

import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProducts = () => {

    const [products, setproducts] = useState({
        Code : '',
        Name:'',
        Unit_measure:''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setproducts((prevproductsData) => ({
            ...prevproductsData,
            [name]: value,
        }));
    };

    const formSubmit = (e) => {
        e.preventDefault();

        const obj = {
            Code: e.target.Code.value,
            // isactive: products.isactive,
            Name: e.target.Name.value,
            Unit_measure: e.target.Unit_measure.value,
          
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

        if (obj.Unit_measure == '') {
            fieldCheck("Please enter Unit_measure");
            document.getElementById("Unit_measure").focus();
            return true;
        }




        //axios
        axios.post("http://127.0.0.1:8000/products/", obj)
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
                                <h1 className="m-0"><Link to="/products" ><img src={BackBtn} style={{ height: "50px", width: "80px" }} /></Link><span></span></h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    {/* <li className="breadcrumb-item"><a href="#">Home</a></li> */}
                                    <li className="breadcrumb-item active">products</li>
                                    <li className="breadcrumb-item active">Add Products</li>
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
                                        <h3 className="card-title">Add new Product</h3>
                                    </div>
                                    <form onSubmit={formSubmit}>
                                        <div className="card-body">
                                            <div className="form-group">
                                                {/* <label htmlFor="exampleInputEmail1">Full Name</label> */}
                                                <label><b>Code</b></label>
                                                <input type="text" className="form-control form-control-border" id="Code"
                                                    placeholder="Code here"
                                                    name="Code"
                                                    value={products.Code}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="form-group">
                                                {/* <label htmlFor="exampleInputEmail1">Full Name</label> */}
                                                <label><b>Name</b></label>
                                                <input type="text" className="form-control form-control-border" id="Name"
                                                    placeholder="Name here"
                                                    name="Name"
                                                    value={products.Name}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="form-group">
                                                {/* <label htmlFor="exampleInputEmail1">Full Name</label> */}
                                                <label><b>Unit of Measure</b></label>
                                                <input type="text" className="form-control form-control-border" id="Unit_measure"
                                                    placeholder="Unit Measure here"
                                                    name="Unit_measure"
                                                    value={products.Unit_measure}
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


                            <div className="col-3">


                            </div>


                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer />

        </>
    );

};
export default AddProducts;