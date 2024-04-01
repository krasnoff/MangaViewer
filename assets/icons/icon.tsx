import React from 'react';
import SvgIcon from 'react-native-svg-icon';
import svgs from './svgs';

const Icon = (props: any) => <SvgIcon {...props} svgs={svgs} />;

export default Icon;