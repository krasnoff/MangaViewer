import React from 'react';
import svgs from './svgs';
import SvgIcon from '../../components/svg-icon';

const Icon = (props: any) => <SvgIcon {...props} svgs={svgs} />;

export default Icon;