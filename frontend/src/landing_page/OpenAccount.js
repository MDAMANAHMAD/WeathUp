import React from 'react';
import { Link } from 'react-router-dom';

function OpenAccount() {
    return (
        <div className='container py-5'>
            <div className='row text-center'>
                <div className='col-12 py-5 border-top'>
                    <h1 className="fw-bold mb-3" style={{ fontSize: '2.5rem', color: '#424242' }}>Open a WealthUp account</h1>
                    <p className="text-muted fs-5 mb-4">Modern platforms and apps, ₹0 investment and flat ₹20 intraday and F&O trades.</p>
                    <Link
                        to="/signup"
                        className="btn btn-primary btn-lg"
                        style={{ padding: '0.8rem 3rem' }}
                    >
                        Sign up now
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default OpenAccount;
