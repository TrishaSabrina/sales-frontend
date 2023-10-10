
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import BackBtn from '../../components/images/backbtn.png';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { ToastContainer, toast } from 'react-toastify';




const Customer = () => {
    const [customers, setcustomers] = useState([]);
    
    const [filteredcustomers, setFilteredcustomers] = useState([]);

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        const result = await axios.get("http://127.0.0.1:8000/customers/");
        setcustomers(result.data);
        setFilteredcustomers(result.data);
        console.log(filteredcustomers);
       
    }

 



    const columns = [
        {
            name: "Code",
            selector: (row) => row.Code,
            sortable: true,
        },

        {
            name: "Name",
            selector: (row) => row.Name,
            sortable: true,
        },
        {
            name: "Address",
            selector: (row) => row.Address,
            sortable: true,
        },
     
      
    ]

    return (
        <>
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                        <div className="col-sm-6">
                                <h1 className="m-0"><Link to="/" ><img src={BackBtn} style={{ height: "50px", width: "80px" }} /></Link><span></span></h1>
                            </div>
                            <div className="col-sm-6">
                                {/* <h1 className="m-0">Products List</h1> */}
                            </div>
                    
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">

                                <div className="card">
                                    {/* <div className="card-header">
                                        <Link to="/addproduct" className='btn btn-primary'  style={{float: 'right'}}>Add New</Link>
                                    </div> */}
                                    <div className="card-body">


                                        <DataTable
                                            columns={columns}
                                            data={filteredcustomers}
                                            title="Customers List"
                                            pagination
                                            fixedHeader
                                            fixedHeaderScrollHeight='520px'
                                            selectableRows
                                            selectableRowsHighlight
                                            highlightOnHover
                                           
                                    
                                            subHeader
                                        
                                            subHeaderAlign="right"

                                        />

                                        


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Customer;