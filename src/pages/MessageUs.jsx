import React from "react";

import "../assets/css/message_us.css";

export default function Messages() {
  return (
      <div className="contact">
        <div className="content">
          <div className="left-side">
            {/* <div className="address details">
              <i className="fas fa-map-marker-alt" />
              <div className="topic">Address</div>
              <div className="text-one">Surkhet, NP12</div>
              <div className="text-two">Birendranagar 06</div>
            </div> */}
            <div className="phone details">
              <i className="fas fa-phone-alt" />
              <div className="topic">Phone</div>
              <div className="text-one">+639123456789</div>
            </div>
            <div className="email details">
              <i className="fas fa-envelope" />
              <div className="topic">Email</div>
              <div className="text-one">resource-finder@gmail.com</div>
            </div>
          </div>
          <div className="right-side">
            <div className="topic-text">Send us a message</div>
            <p>
              Have a specific educational reviewer you're looking for but can't
              find it on our platform? No worries! We're here to assist you.
              Please fill out the form below to request the reviewer you need, and
              we'll do our best to make it available to you.
            </p>
            <form action="#">
              <div className="input-box">
                <input type="text" placeholder="Enter your name" />
              </div>
              <div className="input-box">
                <input type="text" placeholder="Enter your email" />
              </div>
              <div className="input-box message-box">
                <textarea placeholder="Enter your message"></textarea>
              </div>
              <div className="button">
                <input type="button" defaultValue="Send Now" />
              </div>
            </form>
          </div>
        </div>
      </div>
  );
}
