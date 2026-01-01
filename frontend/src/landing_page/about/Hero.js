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
              We launched WealthUp with a simple mission: to make premium wealth management accessible to everyone. By combining cutting-edge technology with deep financial expertise, we've broken down the high-cost barriers of traditional investing. Today, WealthUp is one of the fastest-growing investment platforms, trusted by a new generation of smart investors.
            </p>
            
            {/* Stats Paragraph */}
            <p className="fs-5 text-dark mb-4">
              Over 2 million investors manage their portfolios on our intuitive platform, executing thousands of trades daily with zero hidden fees.
            </p>
          </div>

          {/* Right Column: Additional Information - Takes 6 columns on large screens */}
          <div className="col-lg-6">
            
            {/* Community/Investment Paragraph */}
            <p className="fs-5 text-dark mb-4">
              Our commitment goes beyond just trading. We provide comprehensive educational resources, real-time market insights, and a vibrant community to help you make informed decisions. We back innovative fintech solutions that define the future of finance.
            </p>
            
            {/* Closing Paragraph with Blog/Media links (text-muted for lighter appearance) */}
            <p className="fs-5 text-muted">
              We are constantly evolving. Stay ahead of the market with our daily updates and see how WealthUp is reshaping the investment landscape.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;