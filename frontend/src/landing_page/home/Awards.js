// Awards.js
import React from 'react'; // Make sure you have this import

function Awards() {
  return (
    <div className="container py-5"> {/* py-5 adds padding top/bottom to the section */}
      <div className="row align-items-center"> {/* Vertically aligns content in the row */}
        
        {/* Left Side: Image (col-6) */}
        <div className="col-lg-6 col-md-12 mb-4 mb-lg-0"> 
          {/* mb-4 for mobile spacing, mb-lg-0 removes it on larger screens */}
          <img 
            src="media/images/largestBroker.svg" 
            alt="Award" 
            className="img-fluid d-block mx-auto" // Makes image responsive and centers it
          />
        </div>
        
        {/* Right Side: Text, Lists, and Logos (col-6) */}
        <div className="col-lg-6 col-md-12">
          
          {/* Main Headings with margin-bottom */}
          <h1 className="mb-2">India's Fastest Growing Investment Platform</h1>
          <p className="mb-4">Over 2 Million+ happy investors trust WealthUp.</p>
          
          {/* NESTED ROW: Contains the two lists side-by-side */}
          <div className="row g-4"> {/* g-4 adds a gap/gutter between the columns */}
            
            {/* List 1 (col-6 of the PARENT col-6) */}
            <div className="col-6">
              <ul className="list-unstyled"> {/* list-unstyled removes default bullets/padding */}
                <li><i className="bi bi-trophy-fill text-warning me-2"></i> Best Fintech 2024</li>
                <li><i className="bi bi-trophy-fill text-warning me-2"></i> User Choice 2023</li>
                <li><i className="bi bi-trophy-fill text-warning me-2"></i> Top Innovator</li>
              </ul>
            </div>
            
            {/* List 2 (col-6 of the PARENT col-6) */}
            <div className="col-6">
              <ul className="list-unstyled">
                <li><i className="bi bi-trophy-fill text-warning me-2"></i> Best Support</li>
                <li><i className="bi bi-trophy-fill text-warning me-2"></i> Secure Platform</li>
                <li><i className="bi bi-trophy-fill text-warning me-2"></i> Easy UI Award</li>
              </ul>
            </div>

          </div> {/* End of nested row */}

          <hr className="my-4" /> {/* Separator line with margin top/bottom */}

          {/* Press Logos with margin-top */}
          <p className="small text-muted mb-2">As featured in:</p>
          <img 
            src="media/images/pressLogos.png" 
            alt="Press Logos" 
            className="img-fluid" 
            style={{ maxHeight: '40px' }} // Limit max height for better presentation
          />

        </div>
      </div>
    </div>
  );
}

export default Awards;