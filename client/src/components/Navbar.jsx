import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [showLoginSignup, setShowLoginSignup] = useState(false);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.name) {
            setUserName(user.name);
        }
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow rounded">
            <div className="container-fluid">
                <Link className="navbar-brand mx-4" to="/">
                    <img className="img-fluid" style={{ maxHeight: '70px' }} src='./images/Logo.png' alt="Logo" />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0" style={{ gap: '20px' }}>
                        <li className="nav-item">
                            <Link className="nav-link fs-5" aria-current="page" to="/">Men</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fs-5" to="/about">Women</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fs-5" to="/products">Kids</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fs-5" to="/products">Beauty</Link>
                        </li>
                    </ul>
                    <div
                        className="nav-item dropdown me-5"
                        onMouseEnter={() => setShowLoginSignup(true)}
                        onMouseLeave={() => setShowLoginSignup(false)}
                    >
                        <button className="btn btn-link nav-link fs-5 dropdown-toggle" type="button">
                            <i className="bi bi-person-circle" style={{ marginRight: '5px' }}></i>
                            {userName && <span>{userName}</span>} {/* Show user name here */}
                        </button>
                        {showLoginSignup && (
                            <div className="dropdown-menu show" style={{ maxWidth: '100px', whiteSpace: 'nowrap' }}>
                                <Link className="dropdown-item" to="/login">Login</Link>
                                <Link className="dropdown-item" to="/signup">Sign Up</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
