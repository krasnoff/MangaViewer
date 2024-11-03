import React from 'react';
import { Platform, StyleProp, ViewStyle } from 'react-native';
import Svg from 'react-native-svg';

interface SvgIconProps {
    fill?: string;
    fillRule?: string;
    height?: number | string;
    width?: number | string;
    name: string;
    stroke?: string;
    strokeWidth?: number | string;
    style?: StyleProp<ViewStyle>;
    svgs: { [key: string]: JSX.Element | { svg: JSX.Element; viewBox?: string } };
    viewBox?: string;
    defaultViewBox?: string;
}

const SvgIcon: React.FC<SvgIconProps> = ({
    fill = '#000',
    fillRule = 'evenodd',
    height = '44',
    width = '44',
    name,
    stroke,
    strokeWidth,
    style,
    svgs,
    viewBox,
    defaultViewBox = '0 0 100 100'
}) => {
    if (!name) {
        console.warn("SvgIcon: 'name' prop is required.");
        return null;
    }

    const icon = svgs[`${name}.${Platform.OS}`] || svgs[name];
    if (!icon) {
        console.warn(`SvgIcon: No SVG found for name '${name}'`);
        return null;
    }

    const computedViewBox = viewBox || (!React.isValidElement(icon) && (icon as any).viewBox) || defaultViewBox;

    const svgElement = React.isValidElement(icon) ? icon : (icon as any).svg;

    return (
        <Svg height={height.toString()} width={width.toString()} viewBox={computedViewBox} style={style}>
            {React.cloneElement(svgElement, {
                fill,
                fillRule,
                stroke,
                strokeWidth: strokeWidth?.toString()
            })}
        </Svg>
    );
};

export default SvgIcon;
