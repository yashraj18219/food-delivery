import React from "react";

const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Contact Us 📲   </h1>

      <p className="contact-intro">
        Have questions, feedback, or facing any issues? We'd love to hear from
        you. Reach out to us anytime and our support team will get back to you
        as soon as possible.
      </p>

      <section className="contact-section">
        <h2> Contact Information</h2>
        <ul>
          <li>
            <strong>Email:</strong> yashraj18219@gmail.com
          </li>
          <li>
            <strong>Phone:</strong> +91 8651135716
          </li>
          <li>
            <strong>Support Hours:</strong> 9:00 AM – 10:00 PM (IST)
          </li>
        </ul>
      </section>

      <section className="contact-section">
        <h2> Get in Touch</h2>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <textarea placeholder="Your Message" rows="4"></textarea>
          <button type="button">Send Message</button>
        </form>
      </section>

      <section className="contact-section">
        <h2> Our Support</h2>
        <p>
          Foodie Express currently operates as a learning and demo application.
          All restaurant data is fetched for educational purposes only.
        </p>
      </section>

      <section className="contact-section">
        <h2> We’re Here to Help</h2>
        <p>
          Your feedback helps us improve the platform. Feel free to reach out
          for suggestions, bug reports, or general inquiries.
        </p>
      </section>
    </div>
  );
};

export default Contact;
