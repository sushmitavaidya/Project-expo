import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Row, Card, Button } from 'antd';

function UserHome() {
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <Row >
        {/* Left Section: Google Map */}
        <Col xs={44} md={12}>
          <Card hoverable className="shadow-sm"style={{ width: '550px', height: '450px', justifySelf:'center' }} >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3837.940463031131!2d74.50876887513145!3d15.85972618478981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbf66bb2a587749%3A0x2caf47df523e814f!2sBapat%20Galli%2C%20Raviwar%20Peth%2C%20Belagavi%2C%20Karnataka%20590001!5e0!3m2!1sen!2sin!4v1732862544042!5m2!1sen!2sin"
              width="500"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Google Map"
            ></iframe>
          </Card>
        </Col>

        {/* Right Section: Booking*/}
        <Col xs={16} md={16}  >
          <Card hoverable className="shadow-sm" >
            {/* Price Section */}
            <div className="mb-4 text-center ">
              <h5 className="fw-bold">Price per hour: ₹10</h5>
            </div>

            {/* Book Now Button */}
            <div className="text-center">
              <Button
                type="primary"
                size="large"
                onClick={() => navigate('/BookNow')}
              >
                Book Now
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default UserHome;
