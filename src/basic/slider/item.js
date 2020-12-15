/**@jsx jsx */
import React from 'react';
import { jsx, css, keyframes } from '@emotion/core';


const Id = randomString(7, { allowSymbol: false, allowNumber: false });
const IDs = {
	image        : Id + '-slider-image',
	itemContainer: Id + '-slider-item-container',
};
export const Item = (props) => {
    /**@property */
    const { active = false, imgURL, ...other } = props;

    /**@style */
    const fade = keyframes`
        from {
            opacity: 0.4;
        }
        to {
            opacity: 1;
        }
    `;
    const itemContainer = css`
        animation: ${fade} 1s;
        display: ${active ? 'flex' : 'none'};
        height: 100%;
        width: 100%;
    `;
    const image = css`
        height: auto;
        max-width: 100%;
    `;

    return (
        <div {...other} className={IDs.itemContainer} css={itemContainer} id={IDs.itemContainer}>
            {/* {imgURL && <img  className={IDs.image} css={image} id={IDs.image} src={imgURL} />} */}
            <img className={IDs.image} css={image} id={IDs.image} src={imgURL} />
        </div>
    )
};
