import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, ImageBackground, StyleSheet, Text, View } from "react-native";
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

    const fadeAnim = useRef(new Animated.Value(0.7)).current;

    useEffect(() => {
      setItem(itemId);
      fadeOut();
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
        setCurrentIndex(0);
      }
    }, [data]);

    const snapToItemHandler = (index: number) => {
      setCurrentIndex(index);
    }

    const fadeOut = () => {
      Animated.timing(fadeAnim, {
        toValue: 0.7,
        duration: 3000,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      });
    };

    return (
      <ImageBackground source={BACKGROUND_IMAGE} resizeMode="cover" style={styles.image}>
        {networkError !== '' ? <Text style={styles.text}>{networkError}</Text> : null}
        {networkError === '' ? 
        (
          <View style={{ flex: 1 }}>
            <Animated.View style={[motificationStyles.view, topStyles.view, { opacity: fadeAnim }]}><Text style={[motificationStyles.text, topStyles.text]}>Swipe right in order to see the next page.</Text></Animated.View>
            <Carousel
                loop={false}
                width={width}
                height={height}
                autoPlay={false}
                data={[...new Array(dataSaver.length | 0).keys()]}
                scrollAnimationDuration={1000}
                windowSize={3}
                autoFillData={false}
                onSnapToItem={(index) => snapToItemHandler(index)}
                renderItem={({ index }) => (
                    <View
                        style={{
                            flex: 1,
                            borderWidth: 0,
                            backgroundColor: '#FFFFFF',
                            margin: 0,
                            justifyContent: 'flex-start', 
                            alignItems: 'center'
                        }}
                    >
                        <CustomSizePage uri={`${baseUrl}/data-saver/${hash}/${dataSaver[index]}`} pageIndex={index} currentIndex={currentIndex}></CustomSizePage>
                    </View>
                )}
            />
            <View style={[motificationStyles.view, bottomStyles.view]}><Text style={motificationStyles.text}>Page {currentIndex + 1} from {dataSaver.length}</Text></View>
          </View>
        ) 
        : null}
      </ImageBackground>
    );
}

const topStyles = StyleSheet.create({
  view: {
    top: 20,
    zIndex: 100
  },
  text: {
    textAlign: 'center'
  }
})

const bottomStyles = StyleSheet.create({
  view: {
    bottom: 10
  }
})

const motificationStyles = StyleSheet.create({
  view: {
    position: 'absolute', 
    left: 0, 
    right: 0, 
    backgroundColor: 'black',
    opacity: 0.7,
    paddingBottom: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 50,
    borderRadius: 15
  },
  text: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold'
  }
});

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
