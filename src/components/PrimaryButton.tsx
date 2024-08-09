import React from "react";
import "../styles.css";
import styled, { StyleSheetManager } from "styled-components";

interface ButtonProps {
  active?: boolean;
  type?: "button" | "submit";
  children: React.ReactNode;
  onClick?: () => void;
}

interface StyledProps {
  selected?: boolean;
}

const PrimaryButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button selected={props.active} type={props.type} onClick={props.onClick}>
      {props.children}
    </Button>
  );
};

export default PrimaryButton;

const Button = styled.button<StyledProps>`
  background-color: ${(props) =>
    props.selected ? `var(--color-orange)` : `var(--color-lighter-pink)`};
  border: none;
  color: var(--color-darker-text);
  font-weight: var(--fontWeight-bold);
  transition: 0.2s ease-in;

  &:hover {
    background-color: var(--color-light-pink);
  }
`;
