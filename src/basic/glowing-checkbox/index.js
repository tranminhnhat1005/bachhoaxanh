import React from 'react';
import styled from '@emotion/styled';

const CheckboxContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: max-content;
    flex-direction: column;
`;
const CheckboxLabel = styled.label`
    cursor: pointer;
    height: ${props => props.height}px;
    margin: ${props => props.height / 4}px 0;
    position: relative;
    width: ${props => props.width}px;
    input {
        opacity: 0;
        &:checked ~ .check:before {
            background-color: #101010;
            box-shadow: none;
        }
        &:checked ~ .check:after {
            background-color: #32d74b;
            box-shadow: 0 0 5px #32d74b, 0 0 10px #32d74b, 0 0 20px #32d74b, 0 0 40px #32d74b, 0 0 80px #32d74b;
        }
        &:checked ~ .button {
            left: 50%;
        }
    }
    .check {
        background-color: #101010;
        border-radius: ${props => props.height / 2}px;
        box-shadow: 0 0 0 ${props => props.height / 20}px #101010;
        cursor: pointer;
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
        &:after {
            background-color: #101010;
            border-radius: 50%;
            box-shadow: none;
            content: '';
            height: ${props => props.height / 10}px;
            right: -30px;
            position: absolute;
            top: calc(50% - ${props => props.height / 20}px);
            transition: 0.5s 0.2s;
            width: ${props => props.height / 10}px;
        }
        &:before {
            background-color: #ff3b30;
            border-radius: 50%;
            box-shadow: 0 0 5px #ff3b30, 0 0 10px #ff3b30, 0 0 20px #ff3b30, 0 0 40px #ff3b30, 0 0 80px #ff3b30;
            content: '';
            height: ${props => props.height / 10}px;
            left: -30px;
            position: absolute;
            top: calc(50% - ${props => props.height / 20}px);
            transition: 0.5s 0.2s;
            width: ${props => props.height / 10}px;
        }
    }
    .button {
        background-color: #5a5a5a;
        border-radius: ${props => props.height / 2}px;
        box-shadow: inset 0 -15px 17px #454545, inset 0 15px 17px #454545;
        height: ${props => props.height}px;
        left: 0;
        position: absolute;
        top: 0;
        transition: 0.3s linear;
        width: ${props => props.width / 2}px;
        &:before {
            background-color: #444;
            border-top-left-radius:  ${props => props.height}px;
            border-bottom-left-radius:  ${props => props.height}px;
            box-shadow: inset -5px -5px 15px rgba(0, 0, 0, 0.3);
            content: '';
            filter: blur(2px);
            height:  ${props => props.height}px;
            left: 0;
            position: absolute;
            top: 0;
            width:  ${props => props.width / 23 * 5}px;
        }
        &:after {
            background-color: #444;
            border-top-right-radius:  ${props => props.height}px;
            border-bottom-right-radius:  ${props => props.height}px;
            box-shadow: inset -5px -5px 15px rgba(0, 0, 0, 0.3);
            content: '';
            filter: blur(2px);
            height:  ${props => props.height}px;
            position: absolute;
            right: 0;
            top: 0;
            width:  ${props => props.width / 23 * 5}px;
        }
    }
`;

const CheckboxGlowing = React.memo (
  React.forwardRef ((props, ref) => {
    const {height = 80, width = 240, ...other} = props;
    return (
      <CheckboxContainer ref={ref} {...other}>
        <CheckboxLabel width={width} height={height}>
          <input type="checkbox" />
          <span className="check" />
          <span className="button" />
        </CheckboxLabel>
      </CheckboxContainer>
    );
  })
);

export default CheckboxGlowing;
