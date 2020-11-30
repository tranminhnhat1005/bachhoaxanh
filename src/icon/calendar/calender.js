import React from 'react';

const Calendar = ({
  width = '1em',
  height = '1em',
  bgFill = 'none',
  pathFill = 'currentColor',
  viewBox = '0 0 24 24',
}) => (
    <svg viewBox={viewBox} width={width} height={height} >
        <g id="Group_19" data-name="Group 19" transform="translate(-979.111 -562.556)">
            <rect id="Rectangle_26" data-name="Rectangle 26" width="24" height="24" transform="translate(979.111 562.556)" fill={bgFill}/>
            <path
                id="Path_39"
                data-name="Path 39"
                d="M77.423,2510.863a.965.965,0,0,1-.97.97h-2.91v2.91a.97.97,0,0,1-1.94,0v-2.9h-2.91a.97.97,0,1,1,0-1.94H71.6v-2.91a.97.97,0,0,1,1.94,0v2.91h2.91A.956.956,0,0,1,77.423,2510.863Zm-14.67-11.02h.09a.89.89,0,0,0,.68-.31.862.862,0,0,0,.21-.58v-1.22a.876.876,0,0,0-.26-.63.894.894,0,0,0-.63-.26h-.09a.9.9,0,0,0-.64.26.949.949,0,0,0-.27.63v1.22a.89.89,0,0,0,.22.58A.927.927,0,0,0,62.753,2499.843Zm4.94-.14h.02a.809.809,0,0,0,.5.14h.09a.935.935,0,0,0,.43-.1.912.912,0,0,0,.46-.79v-1.22a.915.915,0,0,0-.35-.72.96.96,0,0,0-.54-.17h-.09a.908.908,0,0,0-.61.23h-.01a.926.926,0,0,0-.3.66v1.22A.961.961,0,0,0,67.693,2499.7Zm5.97.14h.09a.911.911,0,0,0,.69-.31.957.957,0,0,0,.23-.58v-1.22a.91.91,0,0,0-.48-.79h-.01c-.02-.01-.05-.02-.07-.03H74.1l-.02-.01-.03-.01h-.04a.575.575,0,0,0-.26-.05h-.22a.887.887,0,0,0-.76.89v1.22a.881.881,0,0,0,.87.89Zm-5.24,14.41H62.1a1.6,1.6,0,0,1-1.6-1.6v-8.74a1.076,1.076,0,0,1,1.08-1.08h13.37a1.073,1.073,0,0,1,1.08,1.07v2.81c.12.1.23.2.34.31a5.317,5.317,0,0,1,1.03,1.45v-7.86a2.784,2.784,0,0,0-1.92-2.64v.94a1.739,1.739,0,0,1-1.73,1.74h-.09a1.754,1.754,0,0,1-1.74-1.74v-1.07h-1.89v1.07a1.748,1.748,0,0,1-1.74,1.74H68.2a1.739,1.739,0,0,1-1.73-1.74v-1.07h-1.93v1.07a1.729,1.729,0,0,1-1.71,1.74h-.09a1.731,1.731,0,0,1-1.72-1.74v-.93a2.741,2.741,0,0,0-1.89,2.62v12.3a2.748,2.748,0,0,0,2.75,2.75h8.34A5.25,5.25,0,0,1,68.423,2514.253Zm4.155-8.7a5.3,5.3,0,0,0-2.37.56h-7.5a.73.73,0,1,1,0-1.46h11.12a.728.728,0,0,1,.73.73.707.707,0,0,1-.19.48A5.435,5.435,0,0,0,72.578,2505.549Zm-9.87,2.5h5.36a5.188,5.188,0,0,0-.63,1.45h-4.73a.728.728,0,0,1-.73-.73A.719.719,0,0,1,62.708,2508.049Zm0,3.38h4.57a5.155,5.155,0,0,0,.37,1.45h-4.94a.725.725,0,1,1,0-1.45Z"
                transform="translate(922.833 -1931.722)"
                fill={pathFill}
            />
        </g>
    </svg>

);

export default Calendar;