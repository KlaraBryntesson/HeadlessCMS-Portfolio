// import * as React from "react";
import React, { useState } from "react";
import emailjs from "emailjs-com";
import { Link, PageProps } from "gatsby";
import Layout from "../components/layout";
import "bootstrap-icons/font/bootstrap-icons.css";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useContactQuery } from "../helpers/useContactQuery";
import { emailJsConfig } from "../helpers/emailjsCredentials";
import PrimaryButton from "../components/PrimaryButton";

// import { StaticImage } from "gatsby-plugin-image";

const ContactPage: React.FC<PageProps> = ({ data }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const contactData = useContactQuery();
  const contact = contactData.contentfulContact;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Fill in all required fields before sending.");
      return;
    }

    emailjs
      .send(
        emailJsConfig.serviceId,
        emailJsConfig.templateId,
        formData,
        emailJsConfig.publicKey
      )
      .then((response) => {
        console.log("Email sent", response);
        alert("Your message has been sent!");
      })
      .catch((error) => {
        console.error("Failed to send", error);
        alert("Something went wrong! Please try again");
      });
  };

  return (
    <Layout title={contact.pageTitle}>
      <div className="contact-wrapper">
        <div className="contact-container">
          <p>{contact.shortDescription.shortDescription}</p>
          <form onSubmit={handleSubmit}>
            <label>
              Name
              <input type="text" name="name" onChange={handleChange} />
            </label>
            <label>
              Email
              <input type="email" name="email" onChange={handleChange} />
            </label>
            <label>
              Message
              <textarea name="message" onChange={handleChange} />
            </label>
            <PrimaryButton type="submit">Send message</PrimaryButton>
          </form>
        </div>
        <div className="contact-container">
          <div className="contact-info-container">
            <h2>Info</h2>
            <ul>
              <li>
                <i className="bi bi-envelope" />
                {contact.email}
              </li>
              <li>
                <i className="bi bi-github" />
                <a href={contact.github}>Github</a>
              </li>
              <li>
                <i className="bi bi-linkedin" />
                <a href={contact.linkedIn}>LinkedIn</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* -- För att lägga in statiska bilder:
      <StaticImage alt="en bild" src="../images/profile-pic.png" /> */}
    </Layout>
  );
};

export const Head = () => <title>Klara Bryntesson | Contact</title>;
export default ContactPage;
