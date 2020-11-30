import React, {useState} from 'react';
import Edit from '../icon/edit/edit';

const Dnd = () => {
  const [items, setItems] = useState ([
    '🍰 Cake',
    '🍩 Donut',
    '🍎 Apple',
    '🍕 Pizza',
  ]);

  const styles = {
    wrapper: {
      fontFamily: 'sans-serif',
      fontSize: '1.5em',
      textAlign: 'center',
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    main: {
      backgroundColor: '#393939',
      color: '#ddd',
      padding: '10px',
    },
    ul: {
      margin: '0',
      padding: '0',
      listStyle: 'none',
    },
    li: {
      backgroundColor: '#696969',
      padding: '10px 20px',
      position: 'relative',
      display: 'flex',
      alignItems: 'flex-start',
      lineHeight: '1',
    },
    draggable: {
      marginRight: '15px',
      cursor: 'pointer',
    },
  };
  let draggedItem;
  const onDragStart = (e, index) => {
    draggedItem = items[index];
    console.log (index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData ('text/html', e.target.parentNode);
    e.dataTransfer.setDragImage (e.target.parentNode, 20, 20);
  };
  const onDragOver = index => {
    const draggedOverItem = items[index];
    if (draggedItem === draggedOverItem) {
      return;
    }

    let newItems = items.filter (item => item !== draggedItem);

    newItems.splice (index, 0, draggedItem);
    setItems (newItems);
  };

  const onDragEnd = index => {
    index = null;
  };
  return (
    <div className={'wrapper'} style={styles.wrapper}>
      <main style={styles.main}>
        <h3>List of items</h3>
        <ul style={styles.ul}>
          {items.map ((item, index) => (
            <li
              draggable
              key={index}
              style={styles.li}
              onDragOver={() => onDragOver (index)}
            >
              <div
                className={'draggable'}
                draggable
                style={styles.draggable}
                onDragStart={e => onDragStart (e, index)}
                onDragEnd={index => onDragEnd (index)}
              >
                <Edit />
              </div>
              {item}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Dnd;
