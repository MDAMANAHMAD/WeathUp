import React from 'react';
import founderImg from './assets/wealthup_founder.png';

const Team = () => {
  const teamMembers = [
    {
      name: "Aman Ahmad",
      role: "Backend Architect & API Lead",
      description: "Designed the core microservices, database schema, and JWT authentication flow. Implemented complex business logic for real-time order execution and portfolio management.",
      image: founderImg,
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Manish Kushvaha",
      role: "Frontend Developer (Landing Page)",
      description: "Spearheaded the development of the landing page, about section, and user authentication interface using React and Bootstrap. Focused on SEO and responsive design.",
      image: "https://ui-avatars.com/api/?name=Manish+Kushvaha&background=0D6EFD&color=fff&size=280",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Mayank",
      role: "Dashboard & Analytics Lead",
      description: "Built the comprehensive trading dashboard, integrating live data visualizations and complex state management to provide users with actionable insights.",
      image: "https://ui-avatars.com/api/?name=Mayank&background=6c757d&color=fff&size=280",
      linkedin: "#",
      twitter: "#"
    }
  ];

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold text-dark">Meet Our Team</h1>
          <p className="lead text-muted">The minds behind the WealthUp ecosystem</p>
        </div>

        <div className="row g-4 justify-content-center">
          {teamMembers.map((member, index) => (
            <div className="col-lg-4 col-md-6" key={index}>
              <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="text-center pt-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="rounded-circle shadow-sm border border-4 border-white"
                    style={{ width: '180px', height: '180px', objectFit: 'cover' }}
                  />
                </div>
                <div className="card-body text-center p-4">
                  <h3 className="fw-bold text-dark mb-1">{member.name}</h3>
                  <p className="text-primary fw-semibold mb-3">{member.role}</p>
                  <p className="text-muted small mb-4">
                    {member.description}
                  </p>
                  <div className="d-flex justify-content-center gap-3 mt-auto">
                    <a href={member.linkedin} className="btn btn-outline-primary btn-sm rounded-pill px-3">LinkedIn</a>
                    <a href={member.twitter} className="btn btn-outline-dark btn-sm rounded-pill px-3">Twitter</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 p-5 bg-white rounded-4 shadow-sm border-start border-primary border-5">
          <h2 className="fw-bold text-dark mb-3">Our Collaborative Mission</h2>
          <p className="fs-5 text-muted">
            WealthUp is the result of a collaborative effort to democratize finance. By combining robust backend engineering with intuitive frontend design, we've built a platform that handles thousands of transactions with millisecond latency while remaining accessible to every investor.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Team;