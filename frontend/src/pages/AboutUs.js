import React, { useState } from 'react';
import './AboutUs.css';

const AboutUs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: 'How do I book an appointment?',
      answer: 'Yes, simply visit our website and log in or create an account. Search for a doctor based on specialization, location, or availability & confirm your booking.',
    },
    {
      question: 'Can I make an Appointment Online with White Plains Hospital Kendi?',
      answer: 'Yes, online appointments are available based on doctor availability.',
    },
    {
      question: 'Is my personal information secure?',
      answer: 'Absolutely. We follow strict data protection protocols to ensure privacy and security.',
    },
    {
      question: 'Can I cancel or reschedule my appointment?',
      answer: 'Yes, you can cancel or reschedule easily from your profile dashboard.',
    },
    {
      question: 'How do I find a specific doctor or specialist?',
      answer: 'Use our search filters to browse by name, specialty, or location.',
    },
  ];

  return (
    <div className="aboutus-page">
      <div className="aboutus-hero">
        <p className="aboutus-breadcrumb">About Us</p>
        <h2 className="aboutus-title">About Us</h2>
      </div>

      <div className="aboutus-content">
        <div className="aboutus-left">
          <img src="/about1.png" alt="Doctor 1" />
          <img src="/about2.png" alt="Doctor 2" />
        </div>

        <div className="aboutus-middle">
          <div className="aboutus-highlight-box">
            Over 25+ Years<br />Experience
          </div>
          <img src="/about3.png" alt="Main Doctor" />
        </div>

        <div className="aboutus-right">
          <p className="aboutus-subtitle">About Our Company</p>
          <h3 className="aboutus-heading">
            We Are Always Ensure Best Medical Treatment For Your Health
          </h3>
          <p className="aboutus-paragraph">
            At Doccure, we understand the importance of accessible and convenient healthcare.
            Our mission is to simplify the process of finding and booking appointments with
            qualified healthcare professionals, ensuring that you receive the care you need when you need it.
          </p>
          <p className="aboutus-paragraph">
            We envision a world where healthcare is easily accessible to everyone. Whether you're seeking
            routine check-ups, specialized consultations, or emergency care, we strive to connect you
            with the right medical professionals effortlessly.
          </p>
          <div className="aboutus-contact">
            <div style={{
              backgroundColor: '#059dff',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '16px',
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
                <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.05-.24 11.72 11.72 0 0 0 3.68.59 1 1 0 0 1 1 1v3.61a1 1 0 0 1-1 1A17.926 17.926 0 0 1 4 6a1 1 0 0 1 1-1h3.6a1 1 0 0 1 1 1c0 1.27.2 2.51.59 3.68a1 1 0 0 1-.25 1.05l-2.32 2.06Z" />
              </svg>
            </div>

            <div>
              <p className="emergency-label">Need Emergency?</p>
              <p className="emergency-phone">+1 315 369 5943</p>
            </div>
          </div>
        </div>
      </div>

      <div className="whychooseus-section">
        <h2 className="whychooseus-title">Why Choose Us</h2>
        <div className="whychooseus-grid">

          <div className="choose-card">
            {/* Doctor Icon */}
            <div className="choose-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#059dff" viewBox="0 0 24 24"><path d="M12 12c2.761 0 5-2.239 5-5S14.761 2 12 2 7 4.239 7 7s2.239 5 5 5Zm1.528 1.008A6.97 6.97 0 0 1 19 19v2h-2v-2a5 5 0 0 0-10 0v2H5v-2c0-2.83 1.948-5.218 4.528-5.992a7.5 7.5 0 0 1 3 0Z" /></svg>
            </div>
            <h3>Qualified Staff of Doctors</h3>
            <p>Our platform exclusively partners with highly qualified doctors who bring expertise & commitment to delivering top-notch healthcare.</p>
          </div>

          <div className="choose-card">
            {/* 24/7 Icon */}
            <div className="choose-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#059dff" viewBox="0 0 24 24"><path d="M12 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10Zm0-18C7.589 4 4 7.589 4 12s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8Zm1 7V7h-2v6h5v-2h-3Z" /></svg>
            </div>
            <h3>24 Hours Service</h3>
            <p>Experience the healthcare access with our 24/7 service. Whether it's day or night, you can find & book appointments.</p>
          </div>

          <div className="choose-card">
            {/* Lab Icon */}
            <div className="choose-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#059dff" viewBox="0 0 24 24"><path d="M17 4h-2V3a1 1 0 1 0-2 0v1H7v2h2v7.121l-5.293 5.293A.997.997 0 0 0 3 20c0 .553.447 1 1 1h16a1 1 0 0 0 .707-1.707L17 13.121V6h2V4h-2Zm-4 9.879 4.586 4.586A.996.996 0 0 0 18 20H6a.997.997 0 0 0-.707 1.707L10 13.879V6h2v7.879Z" /></svg>
            </div>
            <h3>Quality Lab Services</h3>
            <p>Partnering with accredited labs, your health is our priority, and our quality lab services reflect our dedication to excellence.</p>
          </div>

          <div className="choose-card">
            {/* Consultation Icon */}
            <div className="choose-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#059dff" viewBox="0 0 24 24"><path d="M20 2H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7l2 2 2-2h5a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Zm0 16H4V4h16v14Zm-3-4H7v-2h10v2Zm0-4H7V8h10v2Z" /></svg>
            </div>
            <h3>Free Consultations</h3>
            <p>Your well-being is important, and our commitment to providing accessible care begins with a free initial consultation.</p>
          </div>

        </div>
      </div>
      <div className="cta-section">
        <div className="cta-content">
          <div className="cta-text">
            <h2>Be on Your Way to Feeling Better with the Doccure</h2>
            <p>
              Be on your way to feeling better as we prioritize your health journey
              with personalized and accessible services.
            </p>
            <a href="#contact" className="cta-button">
              Contact With Us
            </a>
          </div>
          <div className="cta-image">
            <img src="/about4.png" alt="Doctor pointing" />
          </div>
        </div>
      </div>
      <div className="faq-section">
        <div className="faq-container">
          <div className="faq-image">
            <img src="/about5.png" alt="Doctors with tablet" />
            <div className="faq-badge">
              <span className="emoji">😊</span>
              <div>
                <strong>95k+</strong>
                <p>Happy Patients</p>
              </div>
            </div>
          </div>

          <div className="faq-content">
            <p className="faq-subtitle">Get Your Answer</p>
            <h2 className="faq-title">Frequently Asked Questions</h2>

            <div className="faq-list">
              {faqData.map((faq, index) => (
                <div
                  key={index}
                  className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                  onClick={() => setActiveIndex(index === activeIndex ? null : index)}
                >
                  <div className="faq-question">
                    <span>{faq.question}</span>
                    <span className="faq-toggle">{activeIndex === index ? '−' : '+'}</span>
                  </div>
                  {activeIndex === index && (
                    <div className="faq-answer">{faq.answer}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>


    </div>


  );
};

export default AboutUs;
