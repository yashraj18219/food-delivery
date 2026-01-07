import React from "react";
import useOnlineStatus from "../utils/useOnlineStatus";

const About = () => {
 const onlineStatus = useOnlineStatus();
  if(onlineStatus === false)
  {
    return (<h2>Please, Check your internet connection!!</h2>)
  }

  return (
    <div className="about-container flex flex-col gap-5 m-10">
      <h1 className="text-4xl font-medium  ">About Foodie Express 🍔</h1>

      <p className="text-lg">
        Foodie Express is a modern food ordering web application that helps
        users discover the best restaurants around them and order their
        favorite meals with ease.
      </p>

      <section className="about-section">
        <h2 className="text-2xl font-medium mb-4"> What We Offer</h2>
        <ul className="list-disc list-inside ml-4">
          <li>Wide variety of restaurants and cuisines</li>
          <li>Easy search and filter options</li>
          <li>Top-rated restaurant recommendations</li>
          <li>Fast and reliable food discovery</li>
        </ul>
      </section>

      <section className="about-section">
        <h2 className="text-2xl font-medium mb-3"> Why Choose Us</h2>
        <p>
          Our platform focuses on simplicity, performance, and user experience.
          With real-time restaurant data, ratings, and smart filters, finding
          your next meal is quick and hassle-free.
        </p>
      </section>

      <section className="about-section">
        <h2 className="text-2xl font-medium mb-4"> Tech Stack</h2>
        <ul className="list-disc list-inside ml-4">
          <li>React.js (Functional Components & Hooks)</li>
          <li>JavaScript (ES6+)</li>
          <li>CSS (Responsive Design)</li>
          <li>Swiggy Public API (for learning purpose)</li>
        </ul>
      </section>

      <section className="about-section">
        <h2 className="text-2xl font-medium mb-3"> Our Mission</h2>
        <p>
          To make food discovery simple, fast, and enjoyable while building
          scalable and modern web applications.
        </p>
      </section>
    </div>
  );
};

export default About;
