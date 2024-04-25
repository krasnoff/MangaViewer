import React from 'react';
import { Text } from 'react-native';
import ContentPageFrame from '../../components/content-page-frame';

function AboutScreen({ route, navigation }: any): JSX.Element {
    return (
        <ContentPageFrame><Text>about screen</Text></ContentPageFrame>
    );
}

export default AboutScreen;