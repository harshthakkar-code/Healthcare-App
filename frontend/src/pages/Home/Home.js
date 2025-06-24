import React from 'react';
import './Home.css';

const Home = () => (
  <div className="home">
    <section className="hero">
      <div className="hero-content">
        <h1>Discover Health: Find Your Trusted Doctors Today</h1>
        <p>Book appointments, consult online, and manage your health with ClinicApp.</p>
        <button className="cta-btn">Book Appointment</button>
      </div>
    </section>
    <section className="specialties">
      <h2>Top Specialties</h2>
      <div className="specialty-list">
        <div className="specialty-card">Cardiology</div>
        <div className="specialty-card">Orthopedics</div>
        <div className="specialty-card">Neurology</div>
        <div className="specialty-card">Pediatrics</div>
        <div className="specialty-card">Psychiatry</div>
        <div className="specialty-card">Endocrinology</div>
      </div>
    </section>
    <section className="featured-doctors">
      <h2>Our Highlighted Doctors</h2>
      <div className="doctor-list">
        <div className="doctor-card">
          <div className="doctor-img" />
          <h3>Dr. Michael Brown</h3>
          <p>Psychologist - Minneapolis, MN</p>
          <button>Book Now</button>
        </div>
        <div className="doctor-card">
          <div className="doctor-img" />
          <h3>Dr. Sandra Jones</h3>
          <p>Cardiologist - Beckley, WV</p>
          <button>Book Now</button>
        </div>
        <div className="doctor-card">
          <div className="doctor-img" />
          <h3>Dr. Harold Bryant</h3>
          <p>Neurologist - Winona, MS</p>
          <button>Book Now</button>
        </div>
      </div>
    </section>
    <section className="testimonials">
      <h2>What Our Patients Say</h2>
      <div className="testimonial-list">
        <div className="testimonial-card">
          <p>"I had a wonderful experience, the staff was friendly and attentive."</p>
          <span>- Deny Hendrawan</span>
        </div>
        <div className="testimonial-card">
          <p>"Genuinely cares about his patients. Helped me understand my condition."</p>
          <span>- Johnson DWayne</span>
        </div>
        <div className="testimonial-card">
          <p>"Great experience with Dr. Chen. She was professional and made me feel comfortable."</p>
          <span>- Rayan Smith</span>
        </div>
      </div>
    </section>
    <section className="blog-preview">
      <h2>Latest Articles</h2>
      <div className="blog-list">
        <div className="blog-card">
          <h4>Understanding and Preventing Glaucoma</h4>
          <p>Glaucoma is a leading cause of blindness worldwide, yet many...</p>
        </div>
        <div className="blog-card">
          <h4>5 Essential Tips for Oral Health</h4>
          <p>Learn the top five daily practices to keep your teeth healthy...</p>
        </div>
        <div className="blog-card">
          <h4>Beating Strong: The Digital Revolution in Cardiac Care</h4>
          <p>Discover how digital advancements are transforming cardiac care...</p>
        </div>
      </div>
    </section>
  </div>
);

export default Home; 