import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './dashboard.css';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <>
         <div className="background-div">
         <div className="container">
                <div className="row mt-5">
                    <div className="col-sm-4">
                    <Link to="/addproduct"> {/* Add Link component with the "to" prop */}
                                <div className="card bg-primary text-white">
                                    <div className="card-body text-center">
                                        <h5 className="card-title">Products</h5>
                                        {/* Add content for the Products card */}
                                    </div>
                                </div>
                            </Link>
                    </div>
                    <div className="col-sm-4">
                    <Link to="/addcustomers"> {/* Add Link component with the "to" prop */}
                                <div className="card bg-success text-white">
                                    <div className="card-body text-center">
                                        <h5 className="card-title">Customers</h5>
                                        {/* Add content for the Customers card */}
                                    </div>
                                </div>
                            </Link>
                    </div>
                    <div className="col-sm-4">
                    <Link to="/addsales"> {/* Add Link component with the "to" prop */}
                                <div className="card bg-danger text-white">
                                    <div className="card-body text-center">
                                        <h5 className="card-title">Sales</h5>
                                        {/* Add content for the Sales card */}
                                    </div>
                                </div>
                            </Link>
                    </div>
                    <div className="col-sm-4">
                    <Link to="/purchase"> {/* Add Link component with the "to" prop */}
                                <div className="card bg-success text-white">
                                    <div className="card-body text-center">
                                        <h5 className="card-title">Purchase</h5>
                                        {/* Add content for the Customers card */}
                                    </div>
                                </div>
                            </Link>
                    </div>
                    
                </div>
            </div>
         </div>
           
        </>
    );
};

export default Dashboard;