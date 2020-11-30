import {number, select, text, withKnobs} from '@storybook/addon-knobs';
import React from 'react';
import mdx from './index.mdx';
import Tooltip from './tooltip';
import * as colors from '../../styles/colors';

export default {
  title: 'Tooltip',
  decorators: [withKnobs],
  parameters: {
    docs: {page: mdx},
  },
};

export const tooltip = () => {
  const size = number ('Text size', 20),
    direction = select ('Direction', ['down', 'up', 'right', 'left']),
    color = select ('Text Color', {...colors}),
    background = select ('Background Color', {...colors}),
    arrow = select ('Show arrow', [false, true]),
    content = text ('Tooltip content', 'This is a tooltip');
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'sans-serif',
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: 120,
        fontSize: size,
        height: '20vh',
      }}
    >
      <Tooltip
        color={color}
        background={background}
        content={content}
        direction={direction}
        arrow={arrow}
      >
        The First Element
      </Tooltip>
      <Tooltip
        color={color}
        background={background}
        content={content}
        direction={'left'}
        arrow={true}
      >
        The First Element
      </Tooltip>
      <Tooltip
        color={color}
        background={background}
        content={content}
        direction={'down'}
        arrow={true}
      >
        The First Element
      </Tooltip>

    </div>
  );
};
