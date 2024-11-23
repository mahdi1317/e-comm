import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products', {
            headers: {
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        });
        result = await result.json();
        setProducts(result);
    };

    const deleteProduct = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this product?");
        if (isConfirmed) {
            let result = await fetch(`http://localhost:5000/product/${id}`, {
                method: "DELETE"
            });
            result = await result.json();
            if (result) {
                getProducts(); // Refresh the product list after deletion
            }
        }
    };

    const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`);
            result = await result.json();
            setProducts(result);
        } else {
            getProducts();
        }
    };

    return (
        <div className="product-list">
            <h3>Product List</h3>
            <input
                type="text"
                className="search-product-box"
                placeholder="Search Product"
                onChange={searchHandle}
            />
            <table className="table w-75 mx-auto">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">S. No.</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Category</th>
                        <th scope="col">Company</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.category}</td>
                                <td>{item.company}</td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => deleteProduct(item._id)}
                                    >
                                        <i className="fas fa-trash-alt"></i> Delete
                                    </button>
                                    &nbsp;
                                    <Link
                                        className="btn btn-primary"
                                        to={`/update/${item._id}`}
                                    >
                                        <i className="fas fa-edit"></i> Update
                                    </Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">
                                <h1>No Result Found</h1>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
