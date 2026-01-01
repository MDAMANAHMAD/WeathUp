import React from 'react';
function Stats() {
    return (
        <div className='container py-5'>
            <div className='row align-items-center'>
                
                <div className='col-lg-6 col-md-12 mb-5 mb-lg-0'>
                    
                    <h1 className='display-4 mb-4'>Invest with confidence 💪</h1>
                    
                    <p className='lead mb-4'>
                        That's why millions of users trust WealthUp with their financial future.
                    </p>
                    
                    <div className='row mt-5'>
                        
                        <div className='col-6 mb-4'>
                            <h2 className='h1 text-dark mb-1'>20+ Lakh</h2>
                            <p className='text-muted'>Active Users</p>
                        </div>

                        <div className='col-6 mb-4'>
                            <h2 className='h1 text-dark mb-1'>₹500Cr+</h2>
                            <p className='text-muted'>Daily Turnover</p>
                        </div>
                        
                        <div className='col-6 mb-4'>
                            <h2 className='h1 text-dark mb-1'>4.8 ★</h2>
                            <p className='text-muted'>App Rating</p>
                        </div>
                        
                        <div className='col-6 mb-4'>
                            <h2 className='h1 text-dark mb-1'>24/7</h2>
                            <p className='text-muted'>Customer Support</p>
                        </div>

                    </div>
                </div>
                
                <div className='col-lg-6 col-md-12 text-center'>
                    <img 
                        src="media/images/ecosystem.png" 
                        style={{width:"90%", maxWidth: "400px"}} 
                        alt="Statistics" 
                        className="img-fluid" 
                    />
                    <div className='mt-4'>
                        <a href="/products" className='btn btn-primary me-3'>Explore our products</a>
                        <a href="/signup" className='btn btn-outline-primary'>Try Demo</a>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default Stats;