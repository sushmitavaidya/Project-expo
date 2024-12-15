import React from "react";
import { useNavigate } from "react-router-dom";
import "../resources/Home.css"
import image from "../images/image.png"
function Home() {
  const navigate = useNavigate();


  // Check if the user is logged in (for simplicity, using localStorage)
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  // Handle Book Now navigation
  const handleBookNow = () => {
    if (isLoggedIn) {
      navigate('/BookNow');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar" style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
        <div className="navbar-logo">ASRS Parking</div>
        <ul className="navbar-links">
          <li onClick={() => {navigate("#home");document.getElementById("home").scrollIntoView({ behavior: "smooth" });}}>Home</li>
          <li onClick={() => {navigate("#features");document.getElementById("features").scrollIntoView({ behavior: "smooth" });}}>Features</li>
          <li onClick={() => {navigate("#contact");document.getElementById("contact").scrollIntoView({ behavior: "smooth" });}}>Contact</li>
          <li onClick={() => navigate("/login")}>Login</li>
          <li onClick={() => navigate("/register")}>Register</li>
        </ul>
      </nav>

      {/* Header Section */}
      <header className="header-section" id="home">
        <div className="header-content">
          <h1>Welcome to ASRS Car Parking Booking System</h1>
          <p>Revolutionize your parking experience with our automated solutions.</p>
          <div className="action-buttons">
            <button className="btn learn-more" onClick={() => {navigate("#features");document.getElementById("features").scrollIntoView({ behavior: "smooth" });}}>
              Learn More
            </button>
            <button className="btn book-now" onClick={handleBookNow}>
              Book Now
            </button>
          </div>
        </div>
        <div className="header-image">
          <img
            src={image}
            alt="ASRS Parking"
            className="header-graphic"
          />
        </div>
      </header>

      {/* Features Section */}
      <section className="features-section" id="features">
        <h2>Features of ASRS Parking System</h2>
        <div className="features">
          <div className="feature">
            <h3>🔒 Secure Parking</h3>
            <p>Advanced security features to protect your vehicle.</p>
          </div>
          <div className="feature">
            <h3>📊 Easy Booking</h3>
            <p>Real-time monitoring and data-driven insights.</p>
          </div>
          <div className="feature">
            <h3>🌍 Convenience</h3>
            <p>Book and manage your parking from anywhere.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section
      <section className="testimonials-section">
        <h2>What Our Customers Say</h2>
        <div className="testimonials">
          <blockquote>
            "ASRS has made parking stress-free. Highly recommend!" – John D.
          </blockquote>
          <blockquote>
            "Efficient, secure, and reliable. Love the convenience!" – Sarah K.
          </blockquote>
          <blockquote>
            "Best parking system I’ve used. Saved me so much time!" – Priya M.
          </blockquote>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="footer" id="contact">
        <div className="footer-logo">ASRS Parking</div>
        <p>© 2024 ASRS Parking System. All rights reserved.</p>
        <div className="footer-links">
          <ul>
            <li onClick={() => navigate("/")}>Home</li>
            <li onClick={() => navigate("/about")}>About</li>
            <li onClick={() => navigate("/contact")}>Contact</li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default Home;
