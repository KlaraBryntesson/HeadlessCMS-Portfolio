import React from "react";
import "../styles.css";
import styled from "styled-components";

interface ButtonProps {
  children: React.ReactNode;
}

const SecondaryButton: React.FC<ButtonProps> = (props) => {
  return <Button>{props.children}</Button>;
};

export default SecondaryButton;

const Button = styled.button`
  background-color: var(--color-light-pink);
  border: 1px solid var(--color-beige);
  color: var(--color-beige);
  font-size: var(--fontSize-1);
  font-weight: 700;
`;
