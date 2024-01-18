import React from "react";
import "../styles.css";
import styled from "styled-components";

interface ButtonProps {
  type?: "button" | "submit";
  children: React.ReactNode;
  onClick?: () => void;
}

const PrimaryButton: React.FC<ButtonProps> = (props) => {
  return <Button onClick={props.onClick}>{props.children}</Button>;
};

export default PrimaryButton;

const Button = styled.button`
  background-color: var(--color-lighter-pink);
  border: none;
  /* border: 2px solid var(--color-dark-orange); */
  color: var(--color-darker-text);
  font-size: var(--fontSize-1);
  font-weight: 700;
  transition: 0.2s ease-in;

  &:hover {
    background-color: var(--color-light-pink);
  }
`;
