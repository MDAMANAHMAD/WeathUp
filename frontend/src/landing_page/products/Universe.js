import React from "react";

function Universe() {
  return (
    <div className="container py-5 mt-5">
      <div className="row text-center mb-5">
        <h1 className="display-5 fw-bold text-dark">The WealthUp Ecosystem</h1>
        <p className="text-muted fs-5">
          Elevate your financial journey with our integrated partner platforms and advanced tools.
        </p>

        <div className="row mt-5 g-4 justify-content-center">
            <div className="col-lg-4 col-md-6 p-4">
                <div className="p-4 border rounded-4 shadow-sm hover-up transition-all bg-white h-100">
                    <img src="media/images/smallcaseLogo.png" alt="AlphaBasket" className="mb-3 img-fluid grayscale" style={{maxHeight: "40px"}} />
                    <h5 className="fw-bold">AlphaBasket</h5>
                    <p className="small text-muted">Thematic investment baskets curated by experts for long-term growth.</p>
                </div>
            </div>
            <div className="col-lg-4 col-md-6 p-4">
                <div className="p-4 border rounded-4 shadow-sm hover-up transition-all bg-white h-100">
                    <img src="media/images/streakLogo.png" alt="WealthBot" className="mb-3 img-fluid grayscale" style={{maxHeight: "40px"}} />
                    <h5 className="fw-bold">WealthBot</h5>
                    <p className="small text-muted">Algo-trading and strategy builder for systematic market participation.</p>
                </div>
            </div>
            <div className="col-lg-4 col-md-6 p-4">
                <div className="p-4 border rounded-4 shadow-sm hover-up transition-all bg-white h-100">
                    <img src="media/images/goldenpiLogo.png" alt="YieldMax" className="mb-3 img-fluid grayscale" style={{maxHeight: "40px"}} />
                    <h5 className="fw-bold">YieldMax</h5>
                    <p className="small text-muted">Direct access to high-yield bonds and corporate debt instruments.</p>
                </div>
            </div>
            <div className="col-lg-4 col-md-6 p-4">
                <div className="p-4 border rounded-4 shadow-sm hover-up transition-all bg-white h-100">
                    <img src="media/images/dittoLogo.png" alt="SafeGuard" className="mb-3 img-fluid grayscale" style={{maxHeight: "40px"}} />
                    <h5 className="fw-bold">SafeGuard</h5>
                    <p className="small text-muted">Personalized insurance advisory and simplified health coverage plans.</p>
                </div>
            </div>
            <div className="col-lg-4 col-md-6 p-4">
                <div className="p-4 border rounded-4 shadow-sm hover-up transition-all bg-white h-100">
                    <img src="media/images/varsity.png" alt="WealthAcademy" className="mb-3 img-fluid grayscale" style={{maxHeight: "40px"}} />
                    <h5 className="fw-bold">WealthAcademy</h5>
                    <p className="small text-muted">Comprehensive financial education from basics to advanced trading.</p>
                </div>
            </div>
        </div>

        <div className="mt-5 pt-4">
            <button
                className="btn btn-primary btn-lg px-5 py-3 fw-bold rounded-pill shadow"
                onClick={() => window.location.href = "/signup"}
            >
                Start Your Journey Now
            </button>
        </div>
      </div>
    </div>
  );
}

export default Universe;