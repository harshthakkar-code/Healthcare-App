import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Live validation for individual field
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };

      if (name === 'name' && value.trim()) delete updatedErrors.name;
      if (name === 'email') {
        if (!value.trim()) updatedErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(value)) updatedErrors.email = 'Email is invalid';
        else delete updatedErrors.email;
      }
      if (name === 'phone' && value.trim()) delete updatedErrors.phone;
      if (name === 'service' && value.trim()) delete updatedErrors.service;
      if (name === 'message' && value.trim()) delete updatedErrors.message;

      return updatedErrors;
    });
  };


  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.service.trim()) newErrors.service = 'Service is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log('Form Submitted:', formData);
      alert('Form submitted! Check console for data.');
      // Optionally clear the form:
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
      });
    }
  };

  return (
    <div className="contactus-page">
      {/* <div className="contactus-breadcrumb">
        &gt; Contact Us
      </div> */}
      <h2 className="contactus-title">Contact Us</h2>
      <div className="contactus-main">
        {/* LEFT INFO (same as before) */}
        <div className="contactus-info">
          <p className="contactus-getintouch">Get in touch</p>
          <h3 className="contactus-question">Have Any Question?</h3>
          <div className="contactus-card">
            <div className="contactus-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="#059dff" width="20" height="20" viewBox="0 0 24 24"><path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7Zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 6.5 12 6.5s2.5 1.1 2.5 2.5S13.4 11.5 12 11.5Z" /></svg>
            </div>
            <div>
              <div className="contactus-card-title">Address</div>
              <div className="contactus-card-text">8432 Mante Highway, Aminaport, USA</div>
            </div>
          </div>
          <div className="contactus-card">
            <div className="contactus-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="#059dff" width="20" height="20" viewBox="0 0 24 24"><path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.05-.24 11.72 11.72 0 0 0 3.68.59 1 1 0 0 1 1 1v3.61a1 1 0 0 1-1 1A17.926 17.926 0 0 1 4 6a1 1 0 0 1 1-1h3.6a1 1 0 0 1 1 1c0 1.27.2 2.51.59 3.68a1 1 0 0 1-.25 1.05l-2.32 2.06Z" /></svg>
            </div>
            <div>
              <div className="contactus-card-title">Phone Number</div>
              <div className="contactus-card-text">+1 315 369 5943</div>
            </div>
          </div>
          <div className="contactus-card">
            <div className="contactus-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="#059dff" width="20" height="20" viewBox="0 0 24 24"><path d="M20 4H4a2 2 0 0 0-2 2v1.8l10 6.2 10-6.2V6a2 2 0 0 0-2-2Zm0 4.3-8 5-8-5V18a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.3Z" /></svg>
            </div>
            <div>
              <div className="contactus-card-title">Email Address</div>
              <div className="contactus-card-text">doccure@example.com</div>
            </div>
          </div>
        </div>

        {/* FORM SECTION */}
        <form className="contactus-form" onSubmit={handleSubmit}>
          <div className="contactus-form-row">
            <div style={{ flex: 1 }}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <div className="form-error">{errors.name}</div>}
            </div>
            <div style={{ flex: 1 }}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <div className="form-error">{errors.email}</div>}
            </div>
          </div>

          <div className="contactus-form-row">
            <div style={{ flex: 1 }}>
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <div className="form-error">{errors.phone}</div>}
            </div>
            <div style={{ flex: 1 }}>
              <input
                type="text"
                name="service"
                placeholder="Services"
                value={formData.service}
                onChange={handleChange}
              />
              {errors.service && <div className="form-error">{errors.service}</div>}
            </div>
          </div>

          <div className="contactus-form-row">
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>
            {errors.message && <div className="form-error">{errors.message}</div>}

          <button type="submit" className="contactus-send-btn">Send Message</button>
        </form>

      </div>
    </div>
  );
};

export default ContactUs;
