import React from "react";

const About = () => {
  return (
    <div className="about-container">
      <h1>About Foodie Express 🍔</h1>

      <p className="about-intro">
        Foodie Express is a modern food ordering web application that helps
        users discover the best restaurants around them and order their
        favorite meals with ease.
      </p>

      <section className="about-section">
        <h2> What We Offer</h2>
        <ul>
          <li>Wide variety of restaurants and cuisines</li>
          <li>Easy search and filter options</li>
          <li>Top-rated restaurant recommendations</li>
          <li>Fast and reliable food discovery</li>
        </ul>
      </section>

      <section className="about-section">
        <h2> Why Choose Us</h2>
        <p>
          Our platform focuses on simplicity, performance, and user experience.
          With real-time restaurant data, ratings, and smart filters, finding
          your next meal is quick and hassle-free.
        </p>
      </section>

      <section className="about-section">
        <h2> Tech Stack</h2>
        <ul>
          <li>React.js (Functional Components & Hooks)</li>
          <li>JavaScript (ES6+)</li>
          <li>CSS (Responsive Design)</li>
          <li>Swiggy Public API (for learning purpose)</li>
        </ul>
      </section>

      <section className="about-section">
        <h2> Our Mission</h2>
        <p>
          To make food discovery simple, fast, and enjoyable while building
          scalable and modern web applications.
        </p>
      </section>
    </div>
  );
};

export default About;
