
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import BackBtn from '../../components/images/backbtn.png';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { ToastContainer, toast } from 'react-toastify';




const SalesList = () => {
    const [saleslist, setsaleslist] = useState([]);
    
    const [filteredsaleslist, setFilteredsaleslist] = useState([]);
    const [totalAmount, setTotalAmount] = useState([]);

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        const result = await axios.get("http://127.0.0.1:8000/sales/");
        // Calculate the "Amount" for each sales order and add it to the data
        const salesDataWithAmount = result.data.map((salesOrder) => ({
            ...salesOrder,
            amount: salesOrder.qty * salesOrder.price,
        }));
        setsaleslist(salesDataWithAmount);
        setFilteredsaleslist(salesDataWithAmount);

        const total = salesDataWithAmount.reduce((acc, current) => acc + current.amount, 0);
        setTotalAmount(total);
    }


    const handleDelete = (itemId) => {
        const shouldDelete = window.confirm('Are you sure you want to delete this item?');
        if (shouldDelete) {
            axios.delete(`http://127.0.0.1:8000/sales/${itemId}/`)
          .then(() => {
            unsuccessnotify();
            loadPosts();
          })
          .catch((error) => {
            console.error('Error deleting item:', error);
          });
        }
        
      };



    const columns = [
        {
            name: "Customer",
            selector: (row) => row.customer,
            sortable: true,
        },

        {
            name: "Date",
            selector: (row) => row.date,
            sortable: true,
        },
        {
            name: "Product",
            selector: (row) => row.product,
            sortable: true,
        },

    {
                name: "Qty",
                selector: (row) => row.qty,
                sortable: true,
            },
    
       {
                name: "Price",
                selector: (row) => row.price,
                sortable: true,
            },
    
            {
                name: "Amount", // Add a new column for "Amount"
                selector: (row) => row.amount,
                sortable: true,
            },
      
            {
                name: "Action",
                cell: (row) =>
                    <>
                       <Link onClick={() => handleDelete(`${row.id}`)} class="btn" data-toggle="tooltip" data-placement="bottom" title="Delete"><i class="fa fa-trash"></i></Link>
                        {/* <span><Link to="/edituser" class="btn" data-toggle="tooltip" data-placement="bottom" title="Details"><i class="fa fa-info-circle"></i></Link>
                        </span> */}
    
                    </>
            },
    ]

    const unsuccessnotify = () => toast.error("Deleted Successfully !", {
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
                        {/* <div className="col-sm-6">
                                <h1 className="m-0"><Link to="/" ><img src={BackBtn} style={{ height: "50px", width: "80px" }} /></Link><span></span></h1>
                            </div> */}
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
                                            data={filteredsaleslist}
                                            title="Sales Order List"
                                            pagination
                                            fixedHeader
                                            fixedHeaderScrollHeight='520px'
                                            selectableRows
                                            selectableRowsHighlight
                                            highlightOnHover
                                           
                                    
                                            subHeader
                                        
                                            subHeaderAlign="right"

                                        />


                <h4>Total Amount: {totalAmount}</h4>
            
                                       

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

export default SalesList;