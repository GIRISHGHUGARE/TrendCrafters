import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="container">
            <footer className="py-5">
                <div className="row">
                    <div className="col-6 col-md-2 mb-3">
                        <h5>Quick Links</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-body-secondary">Home</Link></li>
                            <li className="nav-item mb-2"><Link to="/features" className="nav-link p-0 text-body-secondary">Features</Link></li>
                            <li className="nav-item mb-2"><Link to="/stories" className="nav-link p-0 text-body-secondary">Stories</Link></li>
                            <li className="nav-item mb-2"><Link to="/products" className="nav-link p-0 text-body-secondary">Products</Link></li>
                        </ul>
                    </div>

                    <div className="col-6 col-md-2 mb-3">
                        <h5>About Us</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-body-secondary">Our Mission</Link></li>
                            <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-body-secondary">Our Team</Link></li>
                            <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-body-secondary">Contact Us</Link></li>
                            <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-body-secondary">FAQs</Link></li>
                        </ul>
                    </div>

                    <div className="col-6 col-md-2 mb-3">
                        <h5>Resources</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-body-secondary">Blog</Link></li>
                            <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-body-secondary">Newsletter</Link></li>
                            <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-body-secondary">Support</Link></li>
                        </ul>
                    </div>

                    <div className="col-md-5 offset-md-1 mb-3">
                        <form>
                            <h5>Subscribe to our newsletter</h5>
                            <p>Monthly digest of what's new and exciting from us.</p>
                            <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                                <label htmlFor="newsletter1" className="visually-hidden">Email address</label>
                                <input id="newsletter1" type="text" className="form-control" placeholder="Email address" />
                                <button className="btn btn-custom-white" type="button">Subscribe</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
                    <p> 2024 TrendCrafters, Inc. All rights reserved.</p>
                    <ul className="list-unstyled d-flex">
                        <li className="ms-3"><Link className="link-body-emphasis" to="/"><i className="bi bi-twitter"></i></Link></li>
                        <li className="ms-3"><Link className="link-body-emphasis" to="/"><i className="bi bi-instagram"></i></Link></li>
                        <li className="ms-3"><Link className="link-body-emphasis" to="/"><i className="bi bi-facebook"></i></Link></li>
                    </ul>
                </div>
            </footer>
        </div>
    )
}

export default Footer;