import React from 'react';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-light py-5">
            <div className="container">
                
                {/* --- Top Section: Links --- */}
                <div className="row mb-5">
                    
                    {/* Column 1: Logo & Copyright (Using the WealthUp name) */}
                    <div className="col-lg-3 col-md-6 mb-4">
                        <h5 className="text-dark fw-bold mb-3" style={{ fontSize: '1.4rem' }}>
                            <i className="fa fa-chart-line text-success me-2"></i> 
                            <span className="text-dark">Wealth</span>
                            <span className="text-primary">Up</span> 
                        </h5>
                        <p className="text-muted small">
                            &copy; 2020 - {currentYear}, WealthUp Broking Platform.<br />
                            All rights reserved.
                        </p>
                    </div>

                    {/* Columns 2, 3, 4: Links remain the same for structure */}
                    <div className="col-lg-2 col-md-6 mb-4">
                        <h6 className="fw-bold mb-3">Company</h6>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-muted text-decoration-none small">About</a></li>
                            <li><a href="#" className="text-muted text-decoration-none small">Products</a></li>
                            <li><a href="#" className="text-muted text-decoration-none small">Pricing</a></li>
                            <li><a href="#" className="text-muted text-decoration-none small">Referral programme</a></li>
                            <li><a href="#" className="text-muted text-decoration-none small">Careers</a></li>
                            <li><a href="#" className="text-muted text-decoration-none small">WealthUp.tech</a></li>
                            <li><a href="#" className="text-muted text-decoration-none small">Press & media</a></li>
                            <li><a href="#" className="text-muted text-decoration-none small">WealthUp Cares (CSR)</a></li>
                        </ul>
                    </div>

                    <div className="col-lg-2 col-md-6 mb-4">
                        <h6 className="fw-bold mb-3">Support</h6>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-muted text-decoration-none small">Contact</a></li>
                            <li><a href="#" className="text-muted text-decoration-none small">Support portal</a></li>
                            <li><a href="#" className="text-muted text-decoration-none small">Z-Connect blog</a></li>
                            <li><a href="#" className="text-muted text-decoration-none small">List of charges</a></li>
                            <li><a href="#" className="text-muted text-decoration-none small">Downloads & resources</a></li>
                        </ul>
                    </div>

                    <div className="col-lg-2 col-md-6 mb-4">
                        <h6 className="fw-bold mb-3">Account</h6>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-muted text-decoration-none small">Open an account</a></li>
                            <li><a href="#" className="text-muted text-decoration-none small">Fund transfer</a></li>
                            <li><a href="#" className="text-muted text-decoration-none small">60 day challenge</a></li>
                        </ul>
                    </div>

                </div>

                <hr className="text-muted my-4" />

                {/* --- Bottom Section: Generalized Disclaimer Text --- */}
                <div className="row">
                    <div className="col-12">
                        <p className="text-muted" style={{ fontSize: '0.7rem' }}>
                            **WealthUp Broking Platform** is a fictional educational project and not a real entity. All regulatory details, license numbers, and addresses are placeholders. Investments in the securities market are subject to market risks, read all the related documents carefully before investing. Terms and conditions apply. For educational purposes only.
                        </p>
                    </div>
                </div>

            </div>
        </footer>
    );
}

export default Footer;