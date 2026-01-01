import React from 'react';
function Stats() {
    return (
        <div className='container py-5'>
            <div className='row align-items-center'>
                
                <div className='col-lg-6 col-md-12 mb-5 mb-lg-0'>
                    
                    <h1 className='display-4 mb-4'>Trust with confidence 💪</h1>
                    
                    <p className='lead mb-4'>
                        That's why 1.3+ crore customers trust Zerodha with 3.5+ lakh crores worth of equity investments.
                    </p>
                    
                    <div className='row mt-5'>
                        
                        <div className='col-6 mb-4'>
                            <h2 className='h1 text-dark mb-1'>1.3+ Crore</h2>
                            <p className='text-muted'>Customers</p>
                        </div>

                        <div className='col-6 mb-4'>
                            <h2 className='h1 text-dark mb-1'>₹3.5+ Lakh Cr</h2>
                            <p className='text-muted'>Equity Investments</p>
                        </div>
                        
                        <div className='col-6 mb-4'>
                            <h2 className='h1 text-dark mb-1'>9+</h2>
                            <p className='text-muted'>Years in business</p>
                        </div>
                        
                        <div className='col-6 mb-4'>
                            <h2 className='h1 text-dark mb-1'>No. 1 🏆</h2>
                            <p className='text-muted'>Broker by active clients</p>
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
                        <a href="https://zerodha.com" className='btn btn-primary me-3'>Explore our products</a>
                        <a href="https://zerodha.com" className='btn btn-outline-primary'>Try Kite demo</a>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default Stats;