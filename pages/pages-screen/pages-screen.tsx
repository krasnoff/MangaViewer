import React, { useEffect, useState } from 'react';
import { Dimensions, ImageBackground, StyleSheet, Text, View } from "react-native";
import { BACKGROUND_IMAGE } from '../../assets/images';
import { Daum } from '../../types/search-results';
import { getChapters } from '../../store/actions/chapters';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from 'react-native-reanimated-carousel';
import { ChapterObj } from '../../types/chapters';
import CustomSizePage from '../../components/customSizePage';



function PagesScreen({ route, navigation }: any): JSX.Element {
    const [networkError, setNetworkError] = useState<string>('');
    const dispatch = useDispatch();
    const data = useSelector(state => (state as unknown as any).ChaptersResponse);
    const errorData = useSelector(state => (state as unknown as any).ErrorResponse);
    const [item, setItem] = useState<Daum>();

    const [baseUrl, setBaseUrl] = useState<string>('');
    const [hash, setHash] = useState<string>('');
    const [dataSaver, setDataSaver] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(-1);
    
    const { itemId } = route.params;

    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height; 

    useEffect(() => {
      setItem(itemId);
    }, []);

    useEffect(() => {
      if (item) {
        dispatch(getChapters(item.id));
      }
    }, [item]);

    useEffect(() => {
      if (data && data.chaptersResponse && data.chaptersResponse.data) {
        const pagesList: ChapterObj = data.chaptersResponse.data;
        setBaseUrl(pagesList.baseUrl);
        setHash(pagesList.chapter.hash);
        setDataSaver(pagesList.chapter.dataSaver);
      }
    }, [data]);

    return (
      <ImageBackground source={BACKGROUND_IMAGE} resizeMode="cover" style={styles.image}>
        {networkError !== '' ? <Text style={styles.text}>{networkError}</Text> : null}
        {networkError === '' ? 
        (
          <View style={{ flex: 1 }}>
            <Carousel
                loop
                width={width}
                height={height}
                autoPlay={false}
                data={[...new Array(dataSaver?.length | 0).keys()]}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => {
                  console.log('current index:', index);
                  setCurrentIndex(index);
                }}
                renderItem={({ index }) => (
                    <View
                        style={{
                            flex: 1,
                            borderWidth: 0,
                            backgroundColor: '#FFFFFF',
                            margin: 0,
                            justifyContent: 'flex-start', 
                            alignItems: 'flex-start'
                        }}
                    >
                        <CustomSizePage uri={`${baseUrl}/data-saver/${hash}/${dataSaver[index]}`} pageIndex={index} currentIndex={currentIndex}></CustomSizePage>
                    </View>
                )}
            />
          </View>
        ) 
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
