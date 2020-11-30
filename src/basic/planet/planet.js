/**@jsx jsx */
import React from 'react';
import {jsx, keyframes} from '@emotion/core';
import styled from '@emotion/styled';
import image from './earth.jpg';

const animatePlanet = keyframes`
    0% {
        background-position: 0;
    }
    100% {
        background-position: 162.5%;
    }
`;
const animateLoader = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;
const Body = styled.div`
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    min-height: 100vh;
`;
const PlanetWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    min-width: 50%;
    height: 100vh;
    justify-content: center;
    align-items: center;
    background: #182357;
    h2 {
        color: #FFF;
        font-size: 4em;
        margin-bottom: 40px;
        font-weight: 600;
    }
`;
const PlanetContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
const PlanetLoader = styled.div`
    position: relative;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    animation: ${animateLoader} 4s linear infinite;
    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 50%;
        height: 100%;
        background: linear-gradient(to top, transparent, rgba(0, 255, 249, 0.4));
        background-size: 200px, 360px;
        background-repeat: no-repeat;
        border-top-left-radius: 200px;
        border-bottom-left-radius: 200px;
    }
    &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 10px;
        height: 10px;
        background: #00FFF9;
        border-radius: 50%;
        z-index: 10;
        box-shadow: 0 0 10px #00FFF9, 0 0 20px #00FFF9, 0 0 30px #00FFF9, 0 0 40px #00FFF9,
                    0 0 50px #00FFF9, 0 0 60px #00FFF9, 0 0 70px #00FFF9, 0 0 80px #00FFF9,
                    0 0 90px #00FFF9, 0 0 100px #00FFF9;
    }
    span {
        position: absolute;
        top: 10px;
        right: 10px;
        left: 10px;
        bottom: 10px;
        background: #182357;
        border-radius: 50%; 
    }
`;

const PlanetContent = styled.div`
    position: absolute;
    width: 340px;
    height: 340px;
    background-image: url(${props => props.image});
    border-radius: 50%;
    background-size: cover;
    box-shadow: inset 0 0 20px #03a9f4, 0 0 120px #03a9f4;
    animation: ${animatePlanet} 20s linear infinite;
`;

const Planet = React.memo (
  React.forwardRef (function Planet (props, ref) {
    const {title} = props;
    return (
      <Body ref={ref}>
        <PlanetWrapper>
          <h2>{title}</h2>
          <PlanetContainer>
            <PlanetLoader><span /></PlanetLoader>
            <PlanetContent image={image} />
          </PlanetContainer>
        </PlanetWrapper>
      </Body>
    );
  })
);

export default Planet;
