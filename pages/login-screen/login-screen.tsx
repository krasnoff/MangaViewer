import React from 'react';
import { Text } from 'react-native';
import ContentPageFrame from '../../components/content-page-frame';
import styles from '../../styles/content-page-style';
import PressableLink from '../../components/pressable-link';

function LoginScreen({ route, navigation }: any): JSX.Element {
    return (
        <ContentPageFrame>
            <>
                <Text style={styles.subTitle}>Login</Text>
            </>
        </ContentPageFrame>
    );
}

export default LoginScreen;