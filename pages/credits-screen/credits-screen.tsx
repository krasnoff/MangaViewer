import React, { useEffect, useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BACKGROUND_IMAGE } from '../../assets/images';

function CreditsScreen({ route, navigation }: any): JSX.Element {
    return (
        <ImageBackground source={BACKGROUND_IMAGE} resizeMode="cover" style={styles.image}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={ styles.itemContainer }><Text>credit screen</Text></View>
            </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    scrollViewContent: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        width: '100%',
    },
    itemContainer: {
        flexDirection: 'column',
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: '100%',
        minHeight: 300
    },
});

export default CreditsScreen;