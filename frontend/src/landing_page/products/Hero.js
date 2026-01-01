import React from 'react';

const Hero = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <h1 className="display-4 fw-bold text-dark mb-4">
              We pioneered the discount broking model in India
            </h1>
            <p className="lead text-muted mb-4 fs-4">
              Now, we're breaking ground with our technology.
            </p>
            <p className="fs-5 text-dark mb-4">
              We started with a vision to redefine how India invests. From day one, we focused on building a platform that removes barriers—complexity, cost, and jargon. We christened it WealthUp to signify our commitment to helping you grow your wealth. Today, our sleek, lightning-fast interfaces and proprietary technology handle millions of transactions with ease.
            </p>
            <p className="fs-5 text-dark mb-4">
              With over 2 million trusted users, we account for a significant portion of daily retail volumes, powered by a robust and secure infrastructure that never sleeps.
            </p>
          </div>
          <div className="col-lg-6">
            <p className="fs-5 text-dark mb-4">
              We also believe in giving back. Through our open-source initiatives and community forums, we foster a culture of shared knowledge. We actively invest in the future, supporting next-gen fintech startups that align with our vision of financial freedom.
            </p>
            <p className="fs-5 text-muted">
              We innovate daily. Whether it's a new feature or a system upgrade, we're constantly pushing the boundaries. Check out our blog for the latest tech deep dives and product announcements.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;