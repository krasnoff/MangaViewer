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
    }
}