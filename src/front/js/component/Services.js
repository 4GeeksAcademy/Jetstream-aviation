import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";


const Services = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="row">
        <div className="col-3">
          <div className="card mt-5 ms-5" style={{ width: "18rem" }}>
            <img src="https://res.cloudinary.com/dhwe9frkd/image/upload/v1714073446/samples/JetStream/ACMI-Lease_xl6zm9.png"></img>
            <div className="card-body">
              <h5 className="card-title text-center pb-3">ACMI lease</h5>
              <p className="card-text text-center">
              An ACMI lease refers to a specialized aircraft leasing arrangement encompassing Aircraft, Crew, Maintenance, and Insurance services. Through this lease, Jetstream provides clients with access to aircraft, along with trained crew members, comprehensive maintenance support, and insurance coverage for a predetermined duration. This arrangement allows Jetstream's clients to address short-term operational needs or seasonal demand fluctuations efficiently without the burden of long-term commitments or investment in their fleet.
              </p>
              <Link to="/contact">
              <a href="#" class="btn btn-primary d-flex align-items-center justify-content-center">
              Get your Budget
              </a>
              </Link>
            </div>
          </div>
        </div>

        <div className="col-3">
          <div className="card mt-5 ms-5" style={{ width: "18rem" }}>
            <img src="https://res.cloudinary.com/dhwe9frkd/image/upload/v1714073698/samples/JetStream/charter_u04vqv.webp"></img>
            <div className="card-body">
              <h5 className="card-title text-center pb-3">Charter Flights</h5>
              <p className="card-text text-center">
              On JetStream, charter flights entail customized air travel solutions tailored to the specific needs of clients. These flights offer flexible departure times, routes, and aircraft selection, providing a personalized and convenient travel experience. Whether for business or leisure purposes, Jetstream's charter flights cater to individual preferences, ensuring comfort, privacy, and efficiency throughout the journey. With dedicated customer service and a diverse fleet of aircraft, Jetstream's charter flights offer unparalleled flexibility and convenience for discerning travelers.
              </p>
              <Link to="/contact">
              <a href="#" class="btn btn-primary d-flex align-items-center justify-content-center">
              Get your Budget
              </a>
              </Link>
            </div>
          </div>
        </div>

        <div className="col-3">
          <div className="card mt-5 ms-5 mb-5" style={{ width: "18rem" }}>
            <img src="https://res.cloudinary.com/dhwe9frkd/image/upload/v1714074029/samples/JetStream/azafata_elejsn.jpg"></img>
            <div className="card-body">
              <h5 className="card-title text-center pb-3">Aircraft Management</h5>
              <p className="card-text text-center">
              On JetStream, aircraft management refers to the comprehensive services provided to aircraft owners to streamline operations and maximize the value of their assets. Jetstream offers a range of management solutions, including maintenance oversight, crew staffing, scheduling, and regulatory compliance. By entrusting their aircraft to Jetstream, owners can enjoy hassle-free ownership while Jetstream ensures the aircraft's safety, efficiency, and performance. With Jetstream's expertise and personalized approach, aircraft owners can optimize their investment.
              </p>
              <Link to="/contact"> 
              <a href="#" class="btn btn-primary d-flex align-items-center justify-content-center">
                Get your Budget
              </a>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Services;