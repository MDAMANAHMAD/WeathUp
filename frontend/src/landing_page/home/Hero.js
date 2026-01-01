import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
    return (
        <div className='container py-5'>
            <div className='row text-center align-items-center'>
                <div className='col-12 mb-5 animate__animated animate__fadeIn'>
                    <img 
                        src="media/images/homeHero.png" 
                        alt="WealthUp Hero" 
                        className="img-fluid" 
                        style={{ maxWidth: '50%', margin: '0 auto' }}
                    />
                    <h1 className="hero-title animate__animated animate__fadeInUp">Invest in everything</h1>
                    <p className="hero-subtitle animate__animated animate__fadeInUp animate__delay-1s">
                        Online platform to invest in stocks, derivatives, mutual funds, and more
                    </p>
                    <Link 
                        to="/signup" 
                        className="btn btn-primary btn-lg animate__animated animate__fadeInUp animate__delay-2s"
                    >
                        Sign up now
                    </Link>


                </div>
            </div>
        </div>
    );
}

export default Hero;
