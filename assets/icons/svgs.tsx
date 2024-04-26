import React from 'react';
import { Path } from 'react-native-svg';

// Each nameValuePair can be:
// * Name: <Svg />; or
// * Name: { svg: <Svg />, viewBox: '0 0 50 50' }

export default {
    Forward: {
        svg: <Path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/>,
        viewBox: '0 -960 960 960',
    },
    Menu: {
        svg: <Path d="M120,720L120,640L840,640L840,720L120,720ZM120,520L120,440L840,440L840,520L120,520ZM120,320L120,240L840,240L840,320L120,320Z"/>,
        viewBox: '0 0 960 960',
    },
    Search: {
        svg: <Path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>,
        viewBox: '0 -960 960 960',
    }
}