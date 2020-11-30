import styled from '@emotion/styled';
import React from 'react';

const Tab = props => {
  const {justifyContent = 'space-around', minWidth = 400, ...other} = props;

  const TabButtonContainer = styled.div`
    align-items: center;
    background-color: white;
    border-radius: 4px;
    box-sizing: border-box;
    display: flex;
    height: 10%;
    height: var(--min-width);
    justify-content: ${justifyContent};
    min-width: var(--min-width);
    position: relative;
    width: 100%;
    --min-width: ${minWidth}px;
  `;

  const TabButton = styled.button`
    background-color: transparent;
    border: none;
    border-bottom: solid 4px #EBECF2;
    box-sizing: border-box;
    color: #7F828E;
    cursor: pointer;
    font-size: 14px;
    font-weight: 700;
    outline: none;
    padding: calc(var(--min-width)*5/200) calc(var(--min-width)*3/100) calc(var(--min-width)*3/200) calc(var(--min-width)*3/100);
    position: relative;
    text-align: center;
    text-transform: uppercase;
    transition: all 0.3s ease-in-out;
    :hover:not(:focus) {
      color: #0095FF;
      ::before {
        border-bottom-color: #0095FF;
        transform: scaleX(1);
      }
    }
    :focus {
      color: #111D5E;
      ::before {
        border-bottom-color: #111D5E;
        transform: scaleX(1);
      }
    }
    ::before {
      border-bottom: solid calc(var(--min-width)/100) #EBECF2;
      bottom: calc(var(--min-width)*(-1)/100);
      content: '\\00a0';
      left: 0;
      position: absolute;
      right: 0;
      transform: scaleX(0);
      transition: 0.2s ease-in-out;
    }
  `;

  return (
    <TabButtonContainer className={'tab-button-container'} {...other}>
      <TabButton className={'tab-button'}>Button 1</TabButton>
      <TabButton className={'tab-button'}>Button 2</TabButton>
      <TabButton className={'tab-button'}>Button 3</TabButton>
      <TabButton className={'tab-button'}>Button 4</TabButton>
    </TabButtonContainer>
  );
};

export default React.memo (Tab);
