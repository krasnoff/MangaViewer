import React, { useEffect, useState } from 'react';
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { BACKGROUND_IMAGE } from '../../assets/images';
import { Daum } from '../../types/search-results';
import CustomSizeImage from '../../components/customSizeImage';
import { useDispatch, useSelector } from 'react-redux';
import { getFeed } from '../../store/actions/feed';

function ItemScreen({ route, navigation }: any): JSX.Element {
    const dispatch = useDispatch();
    const data = useSelector(state => (state as unknown as any).FeedResponse);
    const errorData = useSelector(state => (state as unknown as any).ErrorResponse);

    const { itemId } = route.params;
    const [item, setItem] = useState<Daum>();
    const [chapters, setChapters] = useState<Daum[]>([]);

    const [activeIndex, setActiveIndex] = useState<number>(-1);

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
          //setNetworkError('There has been a network problem' + '\n' + 'Please try again later');
        }
      }
      
    }, [errorData]);

    const chapterPressInHandler = (item: Daum, index: number) => {
      setActiveIndex(index)
    }

    const chapterPressOutHandler = () => {
      setActiveIndex(-1)
    }

    const chapterPressHandler = (item: Daum, index: number) => {
      console.log('chapterPressHandler', item);
    }

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

            <View style={styles.row3}>
              <Text style={styles.itemTitle}>Chapters List</Text>
              {chapters.map((el, index) => (
                <Pressable 
                  key={el.id}
                  onPressIn={() => chapterPressInHandler(el, index)}  
                  onPressOut={() => chapterPressOutHandler()}
                  onPress={() => chapterPressHandler(el, index)}>
                  <Text style={[styles?.itemDescription, {color: activeIndex === index ? 'red': 'black'}]}>Chapter {el.attributes.chapter}</Text>
                </Pressable>
              ))}
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
  }
});

export default ItemScreen;