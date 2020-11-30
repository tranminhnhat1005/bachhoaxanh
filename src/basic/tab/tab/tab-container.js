/* eslint-disable react-hooks/exhaustive-deps */
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import React, {useEffect} from 'react';

const TabContainer = React.forwardRef ((props, ref) => {
  const {children, color = '#7F828E', id, width = '100%', ...other} = props;

  const TabButtonContainer = styled.div`
    color: ${color};
    display: flex;
    flex-direction: column;
    overflow: auto; 
    position: relative;
    width: ${width};
  `;
  const findAll = selector => {
    document.querySelectorAll (selector).forEach (el => setAttribute (el));
  };
  const setAttribute = el => {
    el.id = `${id}-${el.id}`;
    el.classList.add (id);
  };
  const setDisplayNone = el => {
    el.style.display = 'none';
  };
  const setDisplayBlock = e => {
    document.getElementById (
      `${id}-tab-panel-${e.currentTarget.id.slice (-1)}`
    ).style.display =
      'block';
  };
  useEffect (() => {
    findAll ('.tab-button');
    findAll ('.tab-panel');
    document.getElementById (`${id}-tab-button-0`).classList.add ('is-active');
    document.getElementById (`${id}-tab-panel-0`).style.display = 'block';
    document.querySelectorAll ('.tab-button').forEach (el =>
      el.addEventListener ('click', e => {
        document.querySelector ('.is-active').classList.remove ('is-active');
        e.currentTarget.classList.add ('is-active');
        document
          .querySelectorAll ('.tab-panel')
          .forEach (el => setDisplayNone (el));
        setDisplayBlock (e);
      })
    );
  });
  return (
    <TabButtonContainer id={`${id}-tab-button-container`} ref={ref} {...other}>
      {children}
    </TabButtonContainer>
  );
});
TabContainer.PropTypes = {
  children: PropTypes.element.isRequired,
  color   : PropTypes.string,
  id      : PropTypes.string.isRequired,
  width   : PropTypes.string,
};

export default React.memo (TabContainer);
