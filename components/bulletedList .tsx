import { ParamListBase, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ToastAndroid } from 'react-native';
import { BottomSheetItemObj } from '../types/bottom-sheet-item-types';
import { useStorage } from '../hooks/useStorage';
import { StackNavigationProp } from '@react-navigation/stack';

const Bullet = () => {
  return (
    <View style={styles.bullet}>
      <Text style={styles.bulletText}>{'\u2022'}</Text>
    </View>
  );
};

interface Props {
    items: BottomSheetItemObj[],
    closeBottomSheetHandler: () => void,
    searchHandler: () => void
}

type HomeScreenNavigationProp = StackNavigationProp<ParamListBase, 'Home'>;

const BulletedList = (props: Props) => {
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const {storeData, loadData} = useStorage();

  const chapterPressInHandler = (index: number) => {
    setActiveIndex(index)
  }

  const chapterPressOutHandler = () => {
    setActiveIndex(-1)
  }

  const chapterPressHandler = (url: never) => {
    if (url === 'resetPage') {
      props.closeBottomSheetHandler();
      navigateReset();
    } else if (url === 'Get Persistent Storage') {
      loadData('favorateMangaDataIDs').then(data => {
        props.closeBottomSheetHandler();
        navigateToFavorites(data);
      });
    } else {
      props.closeBottomSheetHandler();
      navigation.navigate(url) 
    }
  }

  const navigateToFavorites = (data: string | null) => {
    if (data && JSON.parse(data).length > 0) {
      navigation.navigate('Home', { IDs: JSON.parse(data) });
    } else {
      ToastAndroid.show('There no favorite mangas stored in this phone', ToastAndroid.SHORT);
    }
    
  };

  const navigateReset = () => {
    //navigation.navigate('Home', { resetPage: true });
    props.searchHandler();
    navigation.navigate('Home' as never);
  };

  return (
    <View style={styles.container}>
      {props.items.map((item, index) => (
        <Pressable 
                  key={index}
                  onPressIn={() => chapterPressInHandler(index)}  
                  onPressOut={() => chapterPressOutHandler()}
                  onPress={() => chapterPressHandler(item.url as never)}
                  style={styles.item}>
          <Bullet />
          <Text style={[styles.itemText, {color: activeIndex === index ? 'red': 'black'}]}>{item.title}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginTop: 10,
    width: '100%'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  itemText: {
    marginLeft: 5,
    fontWeight: 'bold',
    fontSize: 18
  },
  bullet: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bulletText: {
    color: 'white',
    
  },
});

export default BulletedList;