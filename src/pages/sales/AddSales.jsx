import React, { useState, useEffect } from 'react';
import BackBtn from '../../components/images/backbtn.png';
import axios from 'axios';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import SalesList from './SalesList'; // Import the SalesList component

const AddSales = () => {
    const [sales, setsales] = useState({
        customer: "",
        date: "",
        productQuantities: [],
        price: "", // Added price field
    });

    const [customers, setcustomers] = useState([]);
    const [products, setproducts] = useState([]);
    const [filteredcustomers, setFilteredcustomers] = useState([]);
    const [filteredproducts, setFilteredproducts] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    useEffect(() => {
        loadPosts();
        loadPosts1();
    }, []);

    const loadPosts = async () => {
        const result = await axios.get("http://127.0.0.1:8000/customers/");
        setcustomers(result.data);
        setFilteredcustomers(result.data);
    }

    const loadPosts1 = async () => {
        const result = await axios.get("http://127.0.0.1:8000/products/");
        setproducts(result.data);
        setFilteredproducts(result.data);
    }

    const inputEvent = (ev) => {
        const { name, value } = ev.target;
        setsales((prevsalesData) => ({
            ...prevsalesData,
            [name]: value,
        }));
    };

    const handleCustomerChange = (e) => {
        setSelectedCustomer(e.target.value);
    };

    const handleProductQuantityChange = (selectedOptions) => {
        const productQuantities = selectedOptions.map(option => ({
            product: option.value,
            quantity: '',
            price: '', // Added price field
        }));
        setsales({ ...sales, productQuantities });
    };

    const handleQuantityChange = (index, value) => {
        const updatedProductQuantities = [...sales.productQuantities];
        updatedProductQuantities[index].quantity = value;
        setsales({ ...sales, productQuantities: updatedProductQuantities });
    };

    const handlePriceChange = (index, value) => {
        const updatedProductQuantities = [...sales.productQuantities];
        updatedProductQuantities[index].price = value;
        setsales({ ...sales, productQuantities: updatedProductQuantities });
    };

    const formSubmit = (e) => {
        e.preventDefault();

        const obj = {
            customer: selectedCustomer,
            date: e.target.date.value,
            productQuantities: sales.productQuantities,
            
        };

        if (obj.customer === '') {
            fieldCheck("Please Select a customer");
            return;
        }

        if (obj.date === '') {
            fieldCheck("Please enter Date");
            return;
        }

        axios.post("http://127.0.0.1:8000/sales/", obj)
            .then((result) => {
                successNotify();
                displayReceipt();
            })
            .catch((error) => {
                unsuccessNotify();
            });
    };

    const successNotify = () => {
        toast.success("Added Successfully !", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    const unsuccessNotify = () => {
        toast.error("Not Added. Try again !", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    const fieldCheck = (msg) => {
        toast.error(msg, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    const displayReceipt = () => {
        sales.productQuantities.forEach((product, index) => {
            const receiptData = `
                Product ${index + 1}
                Date: ${sales.date}
                Qty: ${product.quantity}
                Price: ${product.price}
            `;

            alert(`Receipt for Product ${index + 1}:\n${receiptData}`);
        });
    };

    return (
        <>
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">
                                    <Link to="/sales">
                                        <img src={BackBtn} style={{ height: "50px", width: "80px" }} />
                                    </Link>
                                    <span></span>
                                </h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item active">
                                        <a href="#">sales</a>
                                    </li>
                                    <li className="breadcrumb-item active">Add sales</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-3"></div>
                            <div className="col-6">
                                <div className="card card-primary">
                                    <div className="card-header">
                                        <h3 className="card-title">Add new sales order</h3>
                                    </div>
                                    <form onSubmit={formSubmit}>
                                        <div className="card-body">
                                            <div className="form-group">
                                                <label htmlFor="exampleSelectBorder">Customer</label>
                                                <select
                                                    className="custom-select form-control-border"
                                                    id="customer"
                                                    name="customer"
                                                    value={selectedCustomer}
                                                    onChange={handleCustomerChange}
                                                >
                                                    <option value="">Select Customer</option>
                                                    {filteredcustomers.map((row) => (
                                                        <option key={row.id} value={row.Name}>
                                                            {row.Name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Date</label>
                                                <input
                                                    type="date"
                                                    className="form-control form-control-border"
                                                    id="date"
                                                    name="date"
                                                    value={sales.date}
                                                    onChange={inputEvent}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="exampleSelectBorder">Product</label>
                                                <Select
                                                    isMulti
                                                    options={filteredproducts.map((row) => ({
                                                        value: row.Name,
                                                        label: row.Name,
                                                    }))}
                                                    value={sales.productQuantities.map((pq) => ({
                                                        value: pq.product,
                                                        label: pq.product,
                                                    }))}
                                                    onChange={handleProductQuantityChange}
                                                />
                                            </div>

                                            {sales.productQuantities.map((pq, index) => (
                                                <div key={index} className="form-group">
                                                    <label>Quantity for {pq.product}</label>
                                                    <input
                                                        type="number"
                                                        className="form-control form-control-border"
                                                        name={`quantity-${index}`}
                                                        value={pq.quantity}
                                                        onChange={(e) => handleQuantityChange(index, e.target.value)}
                                                    />
                                                    <label>Price for {pq.product}</label>
                                                    <input
                                                        type="number"
                                                        className="form-control form-control-border"
                                                        name={`price-${index}`}
                                                        value={pq.price}
                                                        onChange={(e) => handlePriceChange(index, e.target.value)}
                                                    />
                                                </div>
                                            ))}

                                         
                                        </div>
                                        <div className="card-footer">
                                            <button type="submit" className="btn btn-primary">
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <div>
                                    <h2>Selected Products:</h2>
                                    <ul>
                                        {sales.productQuantities.map((pq, index) => (
                                            <li key={index}>
                                                {pq.product} - Qty: {pq.quantity} - Price: {pq.price}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <SalesList /> {/* Render the SalesList component */}
            <ToastContainer />
        </>
    );
};

export default AddSales;
