import React, { useEffect, useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";
import { BACKGROUND_IMAGE } from '../../assets/images';
import { Daum } from '../../types/search-results';
import CustomSizeImage from '../../components/customSizeImage';

function ItemScreen({ route, navigation }: any): JSX.Element {
    const { itemId } = route.params;
    const [item, setItem] = useState<Daum>();

    useEffect(() => {
      setItem(itemId);
    }, []);

    return (
      <ImageBackground source={BACKGROUND_IMAGE} resizeMode="cover" style={styles.image}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={ styles.itemContainer }>
            <Text style={styles.text}>{item?.attributes.title.en}</Text>
            <View style={styles.row1}>
              <View>{item ? <CustomSizeImage source={{ uri: item?.coverImgURL }} /> : null }</View>
              <View style={styles.subtites}><Text style={styles?.itemDescription}>sdfsdf</Text></View>
            </View>
            <View style={styles.row2}>
              <Text style={styles?.itemDescription}>{item?.attributes.description.en}</Text>
            </View>
          </View>
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
    paddingRight: 10,
    paddingBottom: 10
  },
  itemDescription: {
    fontSize: 16,
  },
  subtites: {
    paddingTop: 5,
    paddingLeft: 10
  }
});

export default ItemScreen;