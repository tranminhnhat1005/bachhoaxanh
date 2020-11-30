import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const TabPanel = props => {
  const {
    backgroundColor = '#FFF',
    children,
    color = '#131313',
    fontFamily,
    fontSize,
    fontWeight,
    index,
    ...other
  } = props;

  const TabPanel = styled.div`
    background-color: ${backgroundColor};
    box-sizing: border-box;
    color: ${color};
    display: none;
    font-family: ${fontFamily};
    font-size: ${fontSize}px;
    font-weight: ${fontWeight};
    height: 100%;
    position: relative;
    width: 100%;
  `;
  return (
    <TabPanel
      aria-labelledby={`tab-${index}`}
      id={`tab-panel-${index}`}
      className={'tab-panel'}
      role={'tab-panel'}
      {...other}
    >
      {children}
    </TabPanel>
  );
};
TabPanel.propTypes = {
  backgroundColor: PropTypes.string,
  children: PropTypes.node,
  color: PropTypes.string,
  fontFamily: PropTypes.string,
  fontSize: PropTypes.number,
  fontWeight: PropTypes.number,
  index: PropTypes.any.isRequired,
};
export default React.memo (TabPanel);
