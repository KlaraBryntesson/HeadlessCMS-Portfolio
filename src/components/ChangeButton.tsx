import React from "react";
import "../styles.css";
import styled from "styled-components";

interface ButtonProps {
  children: React.ReactNode;
  direction: string;
  onClick: () => void;
}

interface StyledButtonProps {
  direction: string;
}

const ChangeButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button direction={props.direction} onClick={props.onClick}>
      {props.children}
    </Button>
  );
};

export default ChangeButton;

const Button = styled.button<StyledButtonProps>`
  background-color: var(--color-light-pink);
  border-radius: 50%;
  border: none;
  color: var(--color-beige);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  position: absolute;
  top: 50%;
  outline: none;
  width: 40px;
  z-index: 1;
  font-size: var(--fontSize-1);
  font-weight: 700;
  transition: background-color ease-in-out 0.5ms;
  transform: translateY(-50%);
  ${(props) => (props.direction === "prev" ? "left: 10px;" : "right: 10px;")};

  &:hover {
    background-color: var(--color-pink);
  }
  i {
    padding: 0;
  }
`;
