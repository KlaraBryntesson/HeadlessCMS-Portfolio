import React, { useState } from "react";
import emailjs from "emailjs-com";
import { PageProps } from "gatsby";
import Layout from "../components/layout";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useContactQuery } from "../helpers/useContactQuery";
import PrimaryButton from "../components/PrimaryButton";
import { ContefulContact } from "../helpers/types";

const ContactPage: React.FC<PageProps> = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const contactData = useContactQuery();
  const contact: ContefulContact = contactData.contentfulContact;

  const emailJSVariables = {
    serviceID: process.env.EMAILJS_SERVICE_ID,
    templateID: process.env.EMAILJS_TEMPLATE_ID,
    publicKey: process.env.EMAILJS_PUBLIC_KEY,
  };

  // Handle changes in form fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Fill in all required fields before sending.");
      return;
    }

    // Use emailjs to send the email
    if (
      emailJSVariables.serviceID &&
      emailJSVariables.templateID &&
      emailJSVariables.publicKey
    ) {
      emailjs
        .send(
          emailJSVariables?.serviceID.toString(),
          emailJSVariables?.templateID.toString(),
          formData,
          emailJSVariables.publicKey
        )
        .then((response) => {
          console.log("Email sent", response);
          alert("Your message has been sent!");
        })
        .catch((error) => {
          console.error("Failed to send", error);
          alert("Something went wrong! Please try again");
        });
    } else {
      console.error("Something is wrong");
    }
  };

  return (
    <Layout metaData={contact.metaData} title={contact.pageTitle}>
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
    </Layout>
  );
};

export default ContactPage;
