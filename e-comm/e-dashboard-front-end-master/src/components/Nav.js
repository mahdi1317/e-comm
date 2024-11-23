import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate('/signup');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light ftco-section w-75 p_3 bg-white shadow mx-auto mt-3">
            <div className="collapse navbar-collapse" id="ftco-nav">
            <a class="navbar-brand" href="index.html"> <h3 className='ms-5'>Logo</h3></a>

                {auth ? (
                    
                    <ul className="navbar-nav ml-auto mr-md-3">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/add">Add Products</Link>
                        </li>
                       
                        
                        <li className="nav-item">
                            <Link className="nav-link" onClick={logout} to="/signup">
                                Logout ({JSON.parse(auth).name})
                            </Link>
                        </li>
                    </ul>
                ) : (
                    <ul className="navbar-nav ml-auto me-3">
                        <li className="nav-item">
                            <Link className="nav-link" to="/signup">Sign Up</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Nav;
