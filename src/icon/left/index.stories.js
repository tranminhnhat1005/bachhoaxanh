import { number, select, withKnobs, boolean } from '@storybook/addon-knobs';
import React from 'react';
import * as colors from '../../colors';
import Left from './left';
import LeftHover from './left-hover';
import LeftDisable from './left-disabled';
import Icon from './index';
import mdx from '../index.mdx';

export default {
  title: 'Icon / Usual',
  decorators: [withKnobs],
  parameters: {
    docs: { page: mdx },
  },
};

export const left = () => {
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
        <Left
          width={width} height={width}
          pathFill={pathFill} bgFill={bgFill}
        />
      </div>
      <div>
        <p>Disable</p>
        <LeftDisable
          width={width} height={width}
          pathFill={pathFill} bgFill={bgFill}
        />
      </div>
      <div>
        <p>Hover</p>
        <LeftHover
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
