import { number, select, withKnobs, boolean } from '@storybook/addon-knobs';
import React from 'react';
import * as colors from '../../colors';
import Right from './right';
import RightHover from './right-hover';
import RightDisable from './right-disabled';
import Icon from './index';
import mdx from '../index.mdx';

export default {
  title: 'Icon / Usual',
  decorators: [withKnobs],
  parameters: {
    docs: { page: mdx },
  },
};

export const right = () => {
  const disabled = boolean('Disabled', false),
    width = number('Width of Click', 80),
    bgFill = select('Background Icon', { ...colors }),
    pathFill = select('Color Icon', { ...colors });
  return (
    <div
      style={{
        fontFamily: 'sans-serif',
        display: 'flex',
        width: '100vw',
        textAlign: 'center',
        justifyContent: 'space-evenly',
      }}
    >
      <div>
        <p>Default</p>
        <Right
          width={width} height={width}
          pathFill={pathFill} bgFill={bgFill}
        />
      </div>
      <div>
        <p>Disable</p>
        <RightDisable
          width={width} height={width}
          pathFill={pathFill} bgFill={bgFill}
        />
      </div>
      <div>
        <p>Hover</p>
        <RightHover
          width={width} height={width}
          pathFill={pathFill} bgFill={bgFill}
        />
      </div>
      <div>
        <p>Preview</p>
        <Icon
          disabled={disabled}
          width={width}
          pathFill={pathFill}
        />
      </div>
    </div>
  );
};
