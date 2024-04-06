import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text } from "react-native";
import { BACKGROUND_IMAGE } from '../../assets/images';


function PagesScreen({ route, navigation }: any): JSX.Element {
    const [networkError, setNetworkError] = useState<string>('');

    return (
      <ImageBackground source={BACKGROUND_IMAGE} resizeMode="cover" style={styles.image}>
        {networkError !== '' ? <Text style={styles.text}>{networkError}</Text> : null}
        {networkError === '' ? 
        (<Text style={styles.text}>pages screen</Text>) 
        : null}
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
    width: '100%'
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
  text: {
    fontFamily: 'Bangers-Regular', 
    fontSize: 20,
    textAlign: 'center'
  },
  row1: {
    width: '100%',
    flexDirection: 'row'
  },
  row2: {
    width: '100%',
    paddingTop: 15,
    paddingLeft: 10,
    paddingRight: 10
  },
  row3: {
    width: '100%',
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 16,
  },
  subtites: {
    paddingTop: 5,
    paddingLeft: 10
  },
  marginBottomNone: {
    marginBottom: 0
  },
  marginBottom5: {
    marginBottom: 5
  }
});

export default PagesScreen;