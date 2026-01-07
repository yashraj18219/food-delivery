import React from "react";

const Contact = () => {
  return (
    <div className=" flex flex-col gap-5 m-10">
      <h1 className="text-4xl font-medium  ">Contact Us 📲   </h1>

      <p className="text-lg">
        Have questions, feedback, or facing any issues? We'd love to hear from
        you. Reach out to us anytime and our support team will get back to you
        as soon as possible.
      </p>

      <section className="contact-section">
        <h2 className="text-2xl font-medium mb-4"> Contact Information</h2>
        <ul className="list-disc list-inside ml-5">
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
        <h2 className="text-2xl font-medium mb-4"> Get in Touch</h2>
        <form className="flex flex-col gap-5 ml-5">
          <input type="text" placeholder="Your Name" className="border-1 w-30" />
          <input type="email" placeholder="Your Email " className="border-1 w-40"/>
          <textarea placeholder="Your Message" rows="4" className="border-1 w-60 h-30"></textarea>
          <button type="button" className="border-1 w-40 rounded-xl hover:bg-green-300 hover:cursor-pointer" >Send Message</button>
        </form>
      </section>

      <section className="contact-section">
        <h2 className="text-2xl font-medium mb-4"> Our Support</h2>
        <p className="text-lg">
          Foodie Express currently operates as a learning and demo application.
          All restaurant data is fetched for educational purposes only.
        </p>
      </section>

      <section className="contact-section">
        <h2 className="text-2xl font-medium mb-4"> We’re Here to Help</h2>
        <p className="text-lg">
          Your feedback helps us improve the platform. Feel free to reach out
          for suggestions, bug reports, or general inquiries.
        </p>
      </section>
    </div>
  );
};

export default Contact;
