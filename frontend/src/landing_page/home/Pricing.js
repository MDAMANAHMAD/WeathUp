import React from 'react';
function Pricing() {
    return (
        <div className='container py-5'>
            
            {/* Header Section */}
            <div className='row justify-content-center text-center mb-5'>
                <div className='col-lg-8 col-md-10'>
                    <h1 className='display-5 mb-3'>Unbeatable Pricing! 💰</h1>
                    <p className='lead text-muted'>
                        We pioneered the concept of discount broking and brought complete transparency to pricing 
                        in India. Flat fees and no hidden charges.
                    </p>
                    <a href="#pricing-details" className='btn btn-link text-decoration-none'>
                        See Pricing 
                        <i className="fa fa-long-arrow-right ms-2" aria-hidden="true"></i>
                    </a>
                </div>
            </div>

            {/* Pricing Cards Section */}
            <div className='row justify-content-center g-4'>
                
                {/* Basic Plan Card */}
                <div className='col-lg-4 col-md-6'>
                    <div className='card h-100 shadow-sm'>
                        <div className='card-body text-center'>
                            <h2 className='card-title h3 mb-3'>Basic Plan</h2>
                            <p className='card-text display-4 fw-bold text-success mb-2'>$10</p>
                            <p className='card-subtitle text-muted'>per month</p>
                            <hr className='my-4' />
                            <ul className='list-unstyled text-start mx-auto' style={{ maxWidth: '200px' }}>
                                <li>✅ 100 Trades/Month</li>
                                <li>✅ Basic Analytics</li>
                                <li>❌ Priority Support</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                {/* Pro Plan Card */}
                <div className='col-lg-4 col-md-6'>
                    <div className='card h-100 shadow-lg border-primary'>
                        <div className='card-body text-center'>
                            <h2 className='card-title h3 mb-3 text-primary'>Pro Plan</h2>
                            <p className='card-text display-4 fw-bold text-primary mb-2'>$20</p>
                            <p className='card-subtitle text-muted'>per month</p>
                            <hr className='my-4' />
                            <ul className='list-unstyled text-start mx-auto' style={{ maxWidth: '200px' }}>
                                <li>✅ Unlimited Trades</li>
                                <li>✅ Advanced Analytics</li>
                                <li>✅ Priority Support</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                {/* Enterprise Plan Card */}
                <div className='col-lg-4 col-md-6'>
                    <div className='card h-100 shadow-sm'>
                        <div className='card-body text-center'>
                            <h2 className='card-title h3 mb-3'>Enterprise Plan</h2>
                            <p className='card-text display-4 fw-bold text-info mb-2'>$30</p>
                            <p className='card-subtitle text-muted'>per month</p>
                            <hr className='my-4' />
                            <ul className='list-unstyled text-start mx-auto' style={{ maxWidth: '200px' }}>
                                <li>✅ All Pro features</li>
                                <li>✅ Dedicated Manager</li>
                                <li>✅ Custom Integrations</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Pricing;