import React, { useEffect, useState } from 'react';
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import { BACKGROUND_IMAGE } from '../../assets/images';
import { Daum } from '../../types/search-results';
import CustomSizeImage from '../../components/customSizeImage';
import { useDispatch, useSelector } from 'react-redux';
import { getFeed } from '../../store/actions/feed';
import Icon from "../../assets/icons/icon";
import { ActionTypes } from '../../enums/action-types';
import { useIsFocused } from '@react-navigation/native';
import { useStorage } from '../../hooks/useStorage';

function ItemScreen({ route, navigation }: any): JSX.Element {
    const dispatch = useDispatch();
    const data = useSelector(state => (state as unknown as any).FeedResponse);
    const errorData = useSelector(state => (state as unknown as any).ErrorResponse);

    const { itemId } = route.params;
    const [item, setItem] = useState<Daum>();
    const [chapters, setChapters] = useState<Daum[]>([]);

    const [activeIndex, setActiveIndex] = useState<number>(-1);
    const [networkError, setNetworkError] = useState<string>('');
    const isFocused = useIsFocused();
    const {storeData, loadData} = useStorage();
    const [favorateMangaDataIDs, setFavorateMangaDataIDs] = useState<string[]>([]);

    useEffect(() => {
      if (isFocused) {
        loadData('favorateMangaDataIDs').then(data => {
          // console.log('favorateMangaDataIDs', data);
          if (data) {
            const dataArr = JSON.parse(data)
            setFavorateMangaDataIDs(dataArr)
          } else {
            setFavorateMangaDataIDs([])
          }
        });
      }
    }, [isFocused]);

    useEffect(() => {
      setItem(itemId);
    }, []);

    useEffect(() => {
      if (item) {
        dispatch(getFeed(item.id));
      }
    }, [item]);

    useEffect(() => {
      if (data.feedResponse.data && data.feedResponse.status === 200) {
        setChapters(data.feedResponse.data.data);
      }
      
    }, [data]);

    useEffect(() => {
      if (errorData.error) {
        if (errorData.error.message === 'Network Error') {
          setNetworkError('There has been a network problem' + '\n' + 'Please try again later');
        }
      }
      
    }, [errorData]);

    const chapterPressInHandler = (item: Daum, index: number) => {
      setActiveIndex(index)
    }

    const chapterPressOutHandler = () => {
      setActiveIndex(-1)
    }

    const chapterPressHandler = (item: Daum) => {
      // console.log('chapterPressHandler', item);
      navigation.navigate('Pages', {
        itemId: item,
      });
    }

    const toggleFavoritesHandler = (item: Daum) => {
      if (favorateMangaDataIDs.indexOf(itemId) > -1) {
        dispatchFromProps(itemId, ActionTypes.REMOVE); 
        ToastAndroid.show('This manga has been removed from your favorites', ToastAndroid.SHORT);
      } else {
        dispatchFromProps(itemId, ActionTypes.ADD);
        ToastAndroid.show('This manga has been added to your favorites', ToastAndroid.SHORT);
      }
    }

    /**
     * here we save to presistant / local when user adds or removes an item from the favorite list
     */
    const dispatchFromProps = (item: Daum, actionType: ActionTypes) => {
      const favorateMangaDataIDsNew = JSON.parse(JSON.stringify(favorateMangaDataIDs)) as string[];
      const isLargeNumber = (element: any) => element === item.id;
      const selectedIndex = favorateMangaDataIDsNew.findIndex(isLargeNumber);
      if (actionType === ActionTypes.ADD) {
        if (selectedIndex === -1) {
          favorateMangaDataIDsNew.push(item.id)
        }
      } else if (actionType === ActionTypes.REMOVE) {
        if (selectedIndex > -1) {
          favorateMangaDataIDsNew.splice(selectedIndex, 1);
        }
      }

      storeData('favorateMangaDataIDs', favorateMangaDataIDsNew);
      setFavorateMangaDataIDs(favorateMangaDataIDsNew);
      console.log(favorateMangaDataIDsNew);
    }

    return (
      <ImageBackground source={BACKGROUND_IMAGE} resizeMode="cover" style={styles.image}>
        {networkError !== '' ? <Text style={styles.text}>{networkError}</Text> : null}
        {networkError === '' ? 
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={ styles.itemContainer }>
            <Text style={styles.text}>{item?.attributes.title.en}</Text>
            <View style={styles.row1}>
              <View>{item ? <CustomSizeImage source={{ uri: item?.coverImgURL }} /> : null }</View>
              <View style={styles.subtites}>
                <Text style={[styles.itemTitle, styles.marginBottomNone]}>Authur</Text>
                <Text style={[styles.itemDescription, styles.marginBottom5]}>{item?.relationships.find(el => el.type === 'author')?.attributes?.name}</Text>
                <Text style={[styles.itemTitle, styles.marginBottomNone]}>Artist</Text>
                <Text style={[styles.itemDescription, styles.marginBottom5]}>{item?.relationships.find(el => el.type === 'artist')?.attributes?.name}</Text>
                {/* <View style={[styles.marginBottom5]}> */}
                  <TouchableOpacity onPress={() => toggleFavoritesHandler(itemId)} style={[styles.favorite]}>
                    <Icon name={favorateMangaDataIDs.indexOf((item as Daum)?.id) > -1 ? 'FavoriteMarked' : 'Favorite'} height="20" width="20" fill={favorateMangaDataIDs.indexOf((item as Daum)?.id) > -1 ? '#00FF00' : '#FF0000'} />
                  </TouchableOpacity>
                {/* </View> */}
              </View>
            </View>
            <View style={styles.row2}>
              <Text style={styles?.itemDescription}>{item?.attributes.description.en}</Text>
            </View>

            <View style={styles.row3}>
              <Text style={styles.itemTitle}>Chapters List</Text>
              {chapters.map((el, index) => (
                <Pressable 
                  key={el.id}
                  onPressIn={() => chapterPressInHandler(el, index)}  
                  onPressOut={() => chapterPressOutHandler()}
                  onPress={() => chapterPressHandler(el)}>
                  <Text style={[styles?.itemDescription, {color: activeIndex === index ? 'red': 'black'}]}>Chapter {el.attributes.chapter}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </ScrollView> : 
        null}
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
  },
  favorite: {
    paddingLeft: 0,
    paddingTop: 5
  }
});

export default ItemScreen;