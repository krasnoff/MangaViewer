import { ImageBackground, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getSimpleSearch } from "../../store/actions/simpleSearch";
import { useContext, useEffect, useState } from "react";
import { BACKGROUND_IMAGE } from "../../assets/images";
import { Daum } from "../../types/search-results";
import Loader from "../../components/loader";
import { useUtilData } from "../../hooks/useParseData";
import CustomSizeImage from "../../components/customSizeImage";
import Icon from "../../assets/icons/icon";
import { ThemeContext } from "../../contexts/themeContext";
import { mangaToFavorites } from "../../store/actions/favorite-mangas";
import { ActionTypes } from "../../enums/action-types";
import { useStorage } from "../../hooks/useStorage";

export function HomeScreen({ route, navigation }: any) {
  const dispatch = useDispatch();
  const data = useSelector(state => (state as unknown as any).SimpleSearchResponse);
  const errorData = useSelector(state => (state as unknown as any).ErrorResponse);
  const favorateMangaData = useSelector(state => (state as unknown as any).FavorateMangaResponse);
      
  const [status, setStatus] = useState<number>(0);
  const [networkError, setNetworkError] = useState<string>('');
  const [articleData, setArticleData] = useState<Daum[]>([]);

  const [showLoader, setShowLoader] = useState<boolean>(true);

  const {parseIncomingData} = useUtilData();
  const theme = useContext(ThemeContext);

  const {storeData, loadData} = useStorage();

  useEffect(() => {
    setShowLoader(true);
    dispatch(getSimpleSearch(theme)); 
  }, [theme]);

  useEffect(() => {
    setNetworkError('');
    
    if (data.simpleSearchResponse.status === 200) {
      if (data.simpleSearchResponse.data.result === 'ok') {
        const resData = parseIncomingData(data.simpleSearchResponse.data.data) as Daum[];
        setArticleData(resData);
      } else {
        setArticleData([]);
      }
      
    }

    setStatus(data.simpleSearchResponse.status);
    setShowLoader(false);
  }, [data]);

  useEffect(() => {
    if (errorData.error) {
      if (errorData.error.message === 'Network Error') {
        setNetworkError('There has been a network problem' + '\n' + 'Please try again later');
      }
    }
    
  }, [errorData]);

  useEffect(() => {
    //console.log('favorateMangaData', favorateMangaData);
    storeData('favorateMangaData', favorateMangaData.favoriteMangas).then(res => {
      console.log('success')
    }).catch(err => {
      // any exception including data not found
      // goes to catch()
      console.warn(err.message);
      switch (err.name) {
        case 'NotFoundError':
          console.log('NotFoundError')
          break;
        case 'ExpiredError':
          console.log('NotFoundError')
          break;
      }
    });;
  }, [favorateMangaData]);

  const toggleFavoritesHandler = (item: Daum) => {
    const prevArticleData = JSON.parse(JSON.stringify(articleData)) as Daum[];
    const chosenManga = prevArticleData.find(el => el.id === item.id);
    if (chosenManga) {
      
      if (chosenManga.isFavorite === true) {
        chosenManga.isFavorite = false;
        dispatch(mangaToFavorites(item, ActionTypes.REMOVE)); 
        ToastAndroid.show('This manga has been removed from your favorites', ToastAndroid.SHORT);
      } else {
        chosenManga.isFavorite = true;
        dispatch(mangaToFavorites(item, ActionTypes.ADD));
        ToastAndroid.show('This manga has been added to your favorites', ToastAndroid.SHORT);
      }
    }

    setArticleData(prevArticleData);
    // console.log('add to favorites on function...', prevArticleData);
  }

  return (
    <SafeAreaView style={{
      flex: 1,
    }}>
      <ImageBackground source={BACKGROUND_IMAGE} resizeMode="cover" style={styles.image}>
        <StatusBar
          //barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          //backgroundColor={backgroundStyle.backgroundColor}
          backgroundColor='#FFFF00'
          barStyle="dark-content"
        />
        {/* <Button title='load data' onPress={onPressLearnMore}></Button> */}
        <View style={styles.view}>
          {status === 503 ? <Text style={styles.text}>Main server is down for maintanence.{'\n'}Please try again later.</Text> : null}
          {networkError !== '' ? <Text style={styles.text}>{networkError}</Text> : null}
          {networkError === '' && status === 200 && articleData.length === 0 ? <Text style={styles.text}>No stories for this search</Text> : null}
          {networkError === '' && status === 200 && articleData.length > 0 ? 
            <ScrollView contentContainerStyle={stylesSCrollView.scrollViewContent}>
            {articleData.map(item => (
              <View key={item.id} style={stylesSCrollView.itemContainer}>
                <View style={stylesSCrollView.mainView}>
                  <View>
                    <CustomSizeImage source={{ uri: item.coverImgURL }} />
                    <TouchableOpacity onPress={() => toggleFavoritesHandler(item)} style={styles.favorite}>
                      <Icon name={item.isFavorite == true ? 'FavoriteMarked' : 'Favorite'} height="20" width="20" fill={item.isFavorite == true ? '#00FF00' : '#FF0000'} />
                    </TouchableOpacity>
                  </View>
                  <View style={stylesSCrollView.itemTextContainer}>
                    <Text style={stylesSCrollView.itemTitle}>{item.attributes.title.en}</Text>
                    <Text style={stylesSCrollView.itemDescription} numberOfLines={10}>{item.attributes.description.en}</Text>
                  </View>
                </View>
                <View style={stylesSCrollView.forwardIcon}>
                  <TouchableOpacity onPress={() => {
                    navigation.navigate('Item', {
                      itemId: item,
                    });
                  }}>
                    <Icon name="Forward" height="30" width="30" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            
            </ScrollView>
          : null}
        </View>
        
        {showLoader ?
          <Loader></Loader>
        : null}
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  view: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    width: '100%' 
  },
  text: {
    fontFamily: 'Bangers-Regular', 
    fontSize: 20,
    textAlign: 'center'
  },
  favorite: {
    paddingLeft: 10,
    paddingTop: 15
  }
});

const stylesSCrollView = StyleSheet.create({
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
    minHeight: 165
  },
  mainView: {
    flexDirection: 'row',
    width: '100%',
    minHeight: 165
  },
  itemTextContainer: {
    flex: 1,
    padding: 10,
    width: '100%',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 16,
  },
  forwardIcon: {
    flexDirection: 'row',
    justifyContent: "flex-end",
    alignItems: 'center',
    width: '100%',
    paddingRight: 8,
    paddingBottom: 8
  }
});