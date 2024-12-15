import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../resources/LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      navigate('/bookings');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar" style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
        <div className="navbar-logo">ASRS</div>
        <ul className="navbar-links">
          {/* <li><a href="#home">Home</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#testimonials">Testimonials</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/signup">Signup</a></li> */}
          <li onClick={() => navigate("/")}>Home</li>
          <li onClick={() => navigate("/about")}>About</li>
          <li onClick={() => navigate("/contact")}>Contact</li>
          <li onClick={() => navigate("/login")}>Login</li>
          <li onClick={() => navigate("/register")}>Register</li>
        </ul>
      </nav>

      {/* Hero Section */}
      <header className="hero-section" id="home" style={{ backgroundImage: 'linear-gradient(to bottom right, #4A4E69, #9A8C98)', color: '#fff' }}>
        <div className="hero-content">
          <h1>Effortless Parking Solutions</h1>
          <p>Streamlined parking management with advanced ASRS technology.</p>
          <button className="btn btn-primary" onClick={handleBookNow}>Book Now</button>
        </div>
      </header>

      {/* Features Section */}
      <section className="features-section" id="features">
        <h2>Why Choose ASRS?</h2>
        <div className="features">
          <div className="feature">
            <span>🚗</span>
            <h3>Boost Parking Capacity</h3>
            <p>Optimize space usage with automated parking solutions.</p>
          </div>
          <div className="feature">
            <span>💸</span>
            <h3>Maximize Revenue</h3>
            <p>Revenue optimization through smart pricing models.</p>
          </div>
          <div className="feature">
            <span>🛑</span>
            <h3>Seamless Integration</h3>
            <p>Easy integration with your existing infrastructure.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section" id="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonials">
          <div className="testimonial">
            <p>"ASRS has revolutionized our parking system. It's efficient and hassle-free!"</p>
            <h4>- Jane Doe</h4>
            <img src="/path-to-jane-image.jpg" alt="Jane Doe" className="testimonial-image" />
          </div>
          <div className="testimonial">
            <p>"The best investment we've made for our office parking management."</p>
            <h4>- John Smith</h4>
            <img src="/path-to-john-image.jpg" alt="John Smith" className="testimonial-image" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="contact">
        <div className="footer-content">
          <div className="footer-logo">ASRS</div>
          <p>Advanced Parking Solutions for Modern Needs.</p>
          <div className="footer-links">
            <a href="#home">Home</a>
            <a href="#features">Features</a>
            <a href="#testimonials">Testimonials</a>
            <a href="/login">Login</a>
            <a href="/signup">Signup</a>
          </div>
        </div>
        <div className="footer-responsive">
          <p>Contact us at: support@asrs.com</p>
          <p>&copy; 2024 ASRS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
