import React from "react";
import "../styles.css";
import styled from "styled-components";

interface ButtonProps {
  active?: boolean;
  type?: "button" | "submit";
  children: React.ReactNode;
  onClick?: () => void;
}

const PrimaryButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button active={props.active} onClick={props.onClick}>
      {props.children}
    </Button>
  );
};

export default PrimaryButton;

const Button = styled.button<ButtonProps>`
  background-color: ${(props) =>
    props.active ? `var(--color-orange)` : `var(--color-lighter-pink)`};
  border: none;
  /* border: 2px solid var(--color-dark-orange); */
  color: var(--color-darker-text);
  font-weight: var(--fontWeight-bold);
  transition: 0.2s ease-in;

  &:hover {
    background-color: var(--color-light-pink);
  }
`;
