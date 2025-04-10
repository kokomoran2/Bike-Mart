import React from "react";
import govindImage from "../assets/g1.jpeg";

const AboutUs = () => {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">About Us</h2>
      <p className="text-muted text-center">
        Welcome to our website! I am an MCA graduate who has passionately developed this platform for Bajaj Motors. 
        My goal is to create a seamless and user-friendly experience for customers, making it easier to explore 
        Bajaj Motors' offerings, book services, and stay updated with the latest innovations.
      </p>
      <div className="row mt-5">
        <div className="col-md-6">
          <h4>Our Mission</h4>
          <p>
            The mission behind this website is to bridge the gap between customers and Bajaj Motors by leveraging 
            cutting-edge technology. We aim to provide an intuitive and efficient platform where users can easily 
            access information, book services, and enhance their automotive experience.
          </p>
        </div>
        <div className="col-md-6">
          <h4>Our Vision</h4>
          <p>
            Our vision is to revolutionize the way customers interact with Bajaj Motors online. By integrating 
            modern web technologies and user-centric design, we aspire to set a new standard for digital engagement 
            in the automotive industry, ensuring a smooth and hassle-free experience for every visitor.
          </p>
        </div>
      </div>
      <div className="text-center mt-4">
      <img src={govindImage} alt="Founder" className="img-fluid d-block mx-auto mt-4" style={{ maxWidth: "300px", borderRadius: "10px" }} />
      </div>
    </div>
  );
};

export default AboutUs;


