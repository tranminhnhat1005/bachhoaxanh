import React, {useEffect, useState} from 'react';
import {useInfiniteScroll} from './useInfiniteScroll';
import {Tooltip} from 'diginet-core-ui/components';

const InfiniteScroll = () => {
  // Fetching fake data from an online API for this example
  const infiniteScroll = useInfiniteScroll ();
  const [tableContents, setTableContents] = useState ([]);
  useEffect (() => {
    fetch ('https://jsonplaceholder.typicode.com/todos/')
      .then (response => response.json ())
      .then (json => setTableContents (json));
  }, []);
  console.log (tableContents);
  return (
    <div style={{display: 'flex', marginLeft: 200}}>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {tableContents.slice (0, infiniteScroll).map ((content, index) => {
            return (
              <tr>
                <td style={{paddingTop: '10px'}}>{index}</td>
                <td style={{paddingTop: '10px'}}>
                  <Tooltip style={{display: 'flex'}} content={content.userId}>
                    {content.userId}
                  </Tooltip>
                </td>
                <td
                  style={{
                    paddingTop: '10px',
                    width: 'auto',
                    maxWidth: 'max-content',
                  }}
                >
                  <Tooltip direction={'left'} content={content.title}>
                    {content.title}
                  </Tooltip>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default InfiniteScroll;
