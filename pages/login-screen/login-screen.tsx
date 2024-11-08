import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import ContentPageFrame from '../../components/content-page-frame';
import styles from '../../styles/content-page-style';
import PressableLink from '../../components/pressable-link';

function LoginScreen({ route, navigation }: any): JSX.Element {
    return (
        <ContentPageFrame>
            <>
                <Text style={styles.subTitle}>Login</Text>

                <TextInput
                    style={stylesForms.input}
                    placeholder='Email'
                    inputMode='email'
                />

                <TextInput
                    style={stylesForms.input}
                    placeholder='Password'
                    secureTextEntry={true}
                />

                <View style={stylesForms.buttonWrap}><Button
                    title="Login"
                /></View>
            </>
        </ContentPageFrame>
    );
}

const stylesForms = StyleSheet.create({
    input: {
        height: 40,
        margin: 0,
        marginTop: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
    buttonWrap: {
        marginTop: 12,
        marginBottom: 12,
        width: 70
    }
});

export default LoginScreen;