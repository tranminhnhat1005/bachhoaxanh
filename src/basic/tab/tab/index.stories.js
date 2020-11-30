import {number, object, withKnobs} from '@storybook/addon-knobs';
import React from 'react';
import AddItem from '../../icons/button/add-item/add-item';
import Add from '../../icons/button/add/add';
import Attach from '../../icons/button/attach/attach';
import TabItem from './tab';
import TabContainer from './tab-container';
import TabHeader from './tab-header';
import TabPanel from './tab-panel';

export default {
  title: 'Others / Tab',
  decorators: [withKnobs],
};

export const Tab = () => {
  const width = number ('Width', 500),
    style = object ('Style of header', {
      justifyContent: 'space-between',
    });
  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'sans-serif',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      <h1
        style={{
          color: '#428bff',
          fontWeight: 'lighter',
          margin: 0,
          padding: '40px 0 20px 0',
          textAlign: 'center',
        }}
      >
        Diginet-Core-UI Tab
      </h1>
      <div style={{width: width}}>
        <TabContainer id={'tab-example'} color={'#7F828E'}>
          <TabHeader style={{justifyContent: 'center', ...style}}>
            <TabItem icon={<Add />} index={0} label={''} />
            <TabItem icon={<AddItem />} index={1} label={'Button 2'} />
            <TabItem icon={<Attach />} index={2} />
            <TabItem label={'Button 4'} index={3} />
          </TabHeader>
          <TabPanel index={0}>
            Hey, once upon a younger year
            When all our shadows disappeared
            The animals inside came out to play
            Hey, when face to face with all our fears
            Learned our lessons through the tears
            Made memories we knew would never fade
          </TabPanel>
          <TabPanel index={1}>
            One day my father—he told me,
            "Son, don't let it slip away"
            He took me in his arms, I heard him say,
            "When you get older
            Your wild life will live for younger days
            Think of me if ever you're afraid."
          </TabPanel>
          <TabPanel index={2}>
            He said, "One day you'll leave this world behind
            So live a life you will remember."
            My father told me when I was just a child
            These are the nights that never die
            My father told me
          </TabPanel>
          <TabPanel index={3}>
            When thunder clouds start pouring down
            Light a fire they can't put out
            Carve your name into those shinning stars
            He said, "Go venture far beyond the shores.
            Don't forsake…
          </TabPanel>
        </TabContainer>
      </div>
    </div>
  );
};
