import { number, select, withKnobs, boolean } from '@storybook/addon-knobs';
import React from 'react';
import * as colors from '../../colors';
import Edit from './edit';
import EditHover from './edit-hover';
import EditDisable from './edit-disabled';
import Icon from './index';
import mdx from '../index.mdx';

export default {
  title: 'Icon / Usual',
  decorators: [withKnobs],
  parameters: {
    docs: { page: mdx },
  },
};

export const edit = () => {
  const disabled = boolean('Disabled', false),
    width = number('Width of Click', 80),
    bgFill = select('Background Icon', { ...colors }),
    pathFill = select('Color Icon', { ...colors }),
    time = number('Time duration (s)', 0.33),
    transitionTimingFunction = select('Transition-timing-function property', [
      'ease',
      'linear',
      'ease-in',
      'ease-out',
      'ease-in-out',
    ]);
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
        <Edit
          width={width} height={width}
          pathFill={pathFill} bgFill={bgFill}
        />
      </div>
      <div>
        <p>Disable</p>
        <EditDisable
          width={width} height={width}
          pathFill={pathFill} bgFill={bgFill}
        />
      </div>
      <div>
        <p>Hover</p>
        <EditHover
          width={width} height={width}
          pathFill={pathFill} bgFill={bgFill}
        />
      </div>
      <div>
        <p>Preview</p>
        <Icon
          transitionOfIcon={`all ${time ? time : 0.33}s ${transitionTimingFunction ? transitionTimingFunction : 'ease'}`}
          disabled={disabled}
          width={width}
          pathFill={pathFill}
        />
      </div>
    </div>
  );
};
