import React from 'react';
function Education() {
    return (
        <div className='container mt-5 py-5'>
            <div className='row align-items-center'>
                
                {/* Left Side: Image (6 Columns) */}
                <div className='col-lg-6 col-md-12 mb-4 mb-lg-0 text-center'>
                    <img 
                        src='media/images/education.svg' 
                        alt='Education' 
                        className='img-fluid' 
                        style={{ maxWidth: '450px' }}
                    />
                </div>
                
                {/* Right Side: Text and Links (6 Columns) */}
                <div className='col-lg-6 col-md-12'>
                    
                    {/* Main Heading */}
                    <h1 className='mb-3'>Free and open market education</h1>
                    
                    {/* Varsity Section */}
                    <p className='lead'>
                        Varsity, the largest online stock market education book in the world covering 
                        everything from the basics to advanced trading.
                    </p>
                    <a href="https://varsity.zerodha.com/" style={{ textDecoration: 'none' }} className='d-inline-block mb-3'>
                        <p className='lead fw-bold text-primary mb-0'>
                            Varsity 
                            <i className="fa fa-long-arrow-right ms-2" aria-hidden="true"></i>
                        </p>
                    </a>
                    
                    {/* TradingQ&A Section */}
                    <p className='mt-3 lead'>
                        TradingQ&A, the most active trading and investment community in India.
                    </p>
                    <a href="https://tradingqna.com/" style={{ textDecoration: 'none' }} className='d-inline-block'>
                        <p className='lead fw-bold text-primary mb-0'>
                            TradingQ&A 
                            <i className="fa fa-long-arrow-right ms-2" aria-hidden="true"></i>
                        </p>
                    </a>

                </div>
            </div>
        </div>
    );
}

export default Education;