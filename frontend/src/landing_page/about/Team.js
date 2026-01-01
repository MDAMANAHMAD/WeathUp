import React from 'react';
import founderImg from './assets/wealthup_founder.png';

const AboutPage = () => {
  return (
    <section className="py-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-4 text-center mb-4 mb-lg-0">
            <img
              src={founderImg}
              alt="WealthUp Founder"
              className="rounded-circle shadow-lg img-fluid border border-4 border-white"
              style={{ width: '280px', height: '280px', objectFit: 'cover' }}
            />
          </div>
          <div className="col-lg-8">
            <h1 className="display-4 fw-bold text-dark mb-4">Building the Future of Wealth</h1>
            <p className="fs-5 text-muted mb-4">
              WealthUp was founded with a single mission: to democratize access to financial markets and provide every individual with the tools they need to build lasting wealth.
            </p>
            <p className="fs-5 text-muted mb-4">
              Our platform combines cutting-edge technology with intuitive design, making it easier than ever for everyone—from first-time investors to experienced traders—to manage their financial destiny.
            </p>
            <p className="fs-5 text-muted mb-4">
              We believe in transparency, security, and constant innovation. Our team is dedicated to providing an unparalleled trading experience that puts our users first.
            </p>
            <div className="mt-5 p-4 bg-light rounded-4 border-start border-primary border-5">
              <h3 className="fw-bold text-dark mb-2">Aman Ahmad</h3>
              <p className="lead text-primary fw-semibold mb-0">Founder & CEO, WealthUp</p>
            </div>
            <div className="mt-4">
               <span className="text-muted small fw-bold text-uppercase tracking-wider">Connect:</span>
               <div className="mt-2 d-flex gap-3">
                  <a href="#" className="text-decoration-none text-primary fw-bold">LinkedIn</a>
                  <a href="#" className="text-decoration-none text-primary fw-bold">Twitter</a>
                  <a href="#" className="text-decoration-none text-primary fw-bold">Medium</a>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;