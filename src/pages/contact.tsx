import React, { useState } from "react";
import emailjs from "emailjs-com";
import { PageProps } from "gatsby";
import Layout from "../components/layout";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useContactQuery } from "../helpers/useContactQuery";
import PrimaryButton from "../components/PrimaryButton";
import { ContefulContact } from "../helpers/types";
import AnimatePage from "../components/AnimatePage";
import styled from "styled-components";

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
      <AnimatePage>
        <ContactWrapper>
          <ContactContainer>
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
          </ContactContainer>
          <ContactContainer>
            <InfoContainer>
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
            </InfoContainer>
          </ContactContainer>
        </ContactWrapper>
      </AnimatePage>
    </Layout>
  );
};

export default ContactPage;

const ContactWrapper = styled.div`
  background-color: var(--color-orange);
  display: flex;
  min-height: 100vh;

  @media (max-width: 850px) {
    flex-direction: column;
  }
`;

const ContactContainer = styled.div`
  padding: var(--spacing-32) var(--spacing-10) var(--spacing-10)
    var(--spacing-10);

  &:nth-child(1) {
    background-color: var(--color-beige);
    padding-left: var(--spacing-16);
    width: 70%;
  }

  &:nth-child(2) {
    position: absolute;
    right: 0;
  }

  p {
    font-size: var(--fontSize-2);
    margin: var(--spacing-6) 0;
    text-align: end;
    width: 70%;
  }

  form,
  form label {
    display: flex;
    flex-direction: column;
    padding-bottom: var(--spacing-6);
  }

  input,
  textarea {
    background-color: inherit;
    border: none;
    border-bottom: 1px var(--color-text-orange) solid;
    box-shadow: none;
    height: 30px;
    width: 70%;
  }

  input:focus,
  textarea:focus {
    outline: none;
  }

  textarea {
    min-height: 100px;
  }

  ul {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-bottom: var(--spacing-6);
    width: 100%;
    min-height: 200px;
  }

  li {
    font-family: var(--font-heading);
    font-size: var(--fontSize-2);
  }

  @media (max-width: 1050px) {
    width: 50%;

    &:nth-child(1) {
      width: 50%;
    }

    &:nth-child(2) {
      position: static;
    }

    p,
    input,
    textarea {
      width: 100%;
    }
  }

  @media (max-width: 850px) {
    width: 100%;
    padding: var(--spacing-10) var(--spacing-20);

    &:nth-child(1) {
      width: 100%;
      padding: var(--spacing-32) var(--spacing-20);
    }

    p {
      text-align: start;
    }
  }

  @media (max-width: 650px) {
    padding: var(--spacing-8) var(--spacing-10);

    &:nth-child(1) {
      padding: var(--spacing-32) var(--spacing-10) var(--spacing-8)
        var(--spacing-10);
    }

    ul li {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: var(--spacing-8);
    }

    button {
      align-self: center;
    }
  }
`;

const InfoContainer = styled.div`
  background-color: var(--color-text-orange);
  color: var(--color-beige);
  margin-top: var(--spacing-16);
  padding: var(--spacing-12) var(--spacing-24);
  width: 500px;

  h2 {
    margin-top: var(--spacing-8);
  }

  @media (max-width: 1050px) {
    margin-top: var(--spacing-12);
    padding-left: var(--spacing-10);
    padding-right: var(--spacing-10);
    width: 100%;
  }

  @media (max-width: 850px) {
    margin: var(--spacing-10) auto;
    width: 90%;
  }

  @media (max-width: 650px) {
    width: 100%;

    h2 {
      text-align: center;
    }
  }
`;
