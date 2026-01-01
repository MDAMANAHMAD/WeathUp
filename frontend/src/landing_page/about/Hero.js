import React from 'react';

/**
 * A Hero section component to display key information about a company (like Zerodha).
 * It uses Bootstrap 5 classes for layout, typography, and styling.
 */
const Hero = () => {
  return (
    // Section with top/bottom padding (py-5) and a light background (bg-light)
    <section className="py-5 bg-light">
      <div className="container">
        {/* Row for the two-column layout, vertically center-aligned */}
        <div className="row align-items-center">
          
          {/* Left Column: Main Text Content - Takes 6 columns on large screens */}
          <div className="col-lg-6 mb-4 mb-lg-0">
            
            {/* Main Headline */}
            <h1 className="display-4 fw-bold text-dark mb-4">
              We pioneered the discount broking model in India
            </h1>
            
            {/* Subtitle/Lead Text */}
            <p className="lead text-muted mb-4 fs-4">
              Now, we're breaking ground with our technology.
            </p>
            
            {/* History Paragraph */}
            <p className="fs-5 text-dark mb-4">
              We kick-started operations on the 15th of August, 2010 with the goal of breaking all barriers that traders and investors face in India in terms of cost, support, opportunity and technology. We named the company Zerodha, a combination of Zero and Rodha, the Sanskrit word for barrier. Today, our disruptive pricing models and in-house technology have made us the largest stock broker in India.
            </p>
            
            {/* Stats Paragraph */}
            <p className="fs-5 text-dark mb-4">
              Over 1.6 crore investors place millions of orders everyday on our powerful investment platforms, contributing over 15% of all retail trading volumes in India.
            </p>
          </div>

          {/* Right Column: Additional Information - Takes 6 columns on large screens */}
          <div className="col-lg-6">
            
            {/* Community/Investment Paragraph */}
            <p className="fs-5 text-dark mb-4">
              In addition, we run a number of popular open online educational and community initiatives to empower retail traders and investors. We've invested in several fintech startups with the goal of growing the Indian capital markets.
            </p>
            
            {/* Closing Paragraph with Blog/Media links (text-muted for lighter appearance) */}
            <p className="fs-5 text-muted">
              And, we're always up to something new every day. Catch up on the latest updates on our blog or see what the media is saying about us.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;