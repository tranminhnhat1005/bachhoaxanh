import {boolean, object, select, text, withKnobs} from '@storybook/addon-knobs';
import React from 'react';
import * as colors from '../colors';
import MoreOptions from './index';
import mdx from '../index.mdx';
import Down from '../../icons/usual/down/down';
import Close from '../../icons/unusual/close/close';
import Plus from '../../icons/unusual/plus/plus';

export default {
  title: 'Button/Option',
  decorators: [withKnobs],
  parameters: {
    docs: {page: mdx},
  },
};

export const ButtonOptions = () => {
  const data = object ('Data options', [
    '🍰 Cake with strawberry ',
    '🍩 Donut without sugar and caffein',
    '🍎 Apple of Steve',
    '🍕 Pizza not straight',
  ]),
    disabled = boolean ('Disabled', false),
    backgroundColor = select ('Background color', {
      ...colors,
    }),
    backgroundColorHover = select ('Background color hover', {
      ...colors,
    }),
    backgroundColorDisabled = select ('Background color disabled', {
      ...colors,
    }),
    backgroundColorFocus = select ('Background color focus', {
      ...colors,
    }),
    color = select ('Color text', {
      ...colors,
    }),
    colorDisabled = select ('Color text disabled', {...colors}),
    colorHover = select ('Color text hover', {
      ...colors,
    }),
    colorFocus = select ('Color text focus', {...colors});
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'sans-serif',
      fontWeight: 700,
      fontSize: '20px',
      color: colors.brand,
      overflow: 'auto',
    },
    type: {
      display: 'flex',
      flexDirection: 'row',
      margin: '10px 50px',
    },
    title: {
      minWidth: 150,
    },
    content: {
      display: 'flex',
      margin: '10px 30px',
      width: '300px',
      justifyContent: 'space-between',
    },
  };
  return (
    <div style={styles.container}>
      <div style={styles.type}>
        <p style={styles.title}>BASIC</p>
        <div style={styles.content}>
          <MoreOptions
            backgroundColor={backgroundColor}
            backgroundColorDisabled={backgroundColorDisabled}
            backgroundColorHover={backgroundColorHover}
            backgroundColorFocus={backgroundColorFocus}
            color={color}
            colorDisabled={colorDisabled}
            colorHover={colorHover}
            colorFocus={colorFocus}
            data={data}
            disabled={disabled}
            endIconActive={<Close bgFill={'none'} pathFill={'currentColor'} />}
            endIconBase={<Down bgFill={'none'} pathFill={'currentColor'} />}
            title={'lựa chọn'}
          />
        </div>
      </div>
      <div style={styles.type}>
        <p style={styles.title}>WITH START ICON</p>
        <div style={styles.content}>
          <MoreOptions
            backgroundColor={backgroundColor}
            backgroundColorDisabled={backgroundColorDisabled}
            backgroundColorHover={backgroundColorHover}
            backgroundColorFocus={backgroundColorFocus}
            color={color}
            colorDisabled={colorDisabled}
            colorHover={colorHover}
            colorFocus={colorFocus}
            data={data}
            disabled={disabled}
            endIconActive={<Close bgFill={'none'} pathFill={'currentColor'} />}
            endIconBase={<Down bgFill={'none'} pathFill={'currentColor'} />}
            startIcon={<Plus bgFill={'none'} pathFill={'currentColor'} />}
            title={'thêm'}
          />
        </div>
      </div>
      <div style={styles.type}>
        <p style={styles.title}>
          2 IN 1: <span
            style={{
              fontFamily: 'monospace',
              color: colors.success6,
            }}
          >
            loading...
          </span>
        </p>
        <div style={{...styles.content, width: '1000px'}} />
      </div>
    </div>
  );
};
