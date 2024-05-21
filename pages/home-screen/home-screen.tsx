import { ImageBackground, SafeAreaView, StatusBar, StyleSheet, ToastAndroid } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getSimpleSearch } from "../../store/actions/simpleSearch";
import { useContext, useEffect, useRef, useState } from "react";
import { BACKGROUND_IMAGE } from "../../assets/images";
import { Daum } from "../../types/search-results";
import { useUtilData } from "../../hooks/useParseData";
import { ThemeContext } from "../../contexts/themeContext";
import { useStorage } from "../../hooks/useStorage";
import { useFocusEffect } from "@react-navigation/native";
import { MangasList } from "../../components/mangasList";
import { ActionTypes } from "../../enums/action-types";
import { mangaToFavorites } from "../../store/actions/favorite-mangas";

export function HomeScreen({ route, navigation }: any) {
  const dispatch = useDispatch();
  const data = useSelector(state => (state as unknown as any).SimpleSearchResponse);
  const errorData = useSelector(state => (state as unknown as any).ErrorResponse);
  const favorateMangaData = useSelector(state => (state as unknown as any).FavorateMangaResponse);
      
  const [status, setStatus] = useState<number>(-1);
  const [networkError, setNetworkError] = useState<string>('');
  const [articleData, setArticleData] = useState<Daum[]>([]);
  const [favoriteArticleData, setFavoriteArticleData] = useState<Daum[]>([]);
  
  const [showLoader, setShowLoader] = useState<boolean>(true);

  const {parseIncomingData} = useUtilData();
  const theme = useContext(ThemeContext);

  const {storeData, loadData} = useStorage();
  const [favorateMangaDataIDs, setFavorateMangaDataIDs] = useState<string[]>([]);
  const isInitialRender = useRef(true);

  // every time we change favorite manga data
  useEffect(() => {
    //console.log('favorateMangaData', favorateMangaData.favoriteMangas);
    const prevArticleData = JSON.parse(JSON.stringify(articleData)) as Daum[];
    setArticleData(markFavoriteData(prevArticleData));
  }, [favorateMangaData]);

  /**
   * start fetch initial call to manga group items
   */
  useEffect(() => {
    setStatus(-1);
    setShowLoader(true);
    dispatch(getSimpleSearch(theme)); 
  }, [theme]);

  /**
   * recieves initial call of manga groups from mangadex server
   */
  useEffect(() => {
    setNetworkError('');
    
    if (data.simpleSearchResponse.status === 200) {
      if (data.simpleSearchResponse.data.result === 'ok') {
        let resData = parseIncomingData(data.simpleSearchResponse.data.data) as Daum[];
        resData = markFavoriteData(resData);        
        setArticleData(resData);
      } else {
        setArticleData([]);
      }
      
    }

    setStatus(data.simpleSearchResponse.status);
    setShowLoader(false);
  }, [data]);

  // mark all the favorite data on the screen
  const markFavoriteData = (resData: Daum[]) => {
    if (favoriteArticleData && favoriteArticleData.length > 0) {
      const listFavoriteIds = favoriteArticleData ? favoriteArticleData.map(el => el.id) : [];
            
      resData.forEach(element => {
        const selectedManga = listFavoriteIds.find(el => el === element.id);
        if (selectedManga) {
          if (element.isFavorite === true) {
            element.isFavorite = false;
          } else {
            element.isFavorite = true;
          }
        }
      })
    }

    return resData;
  }

  /**
   * handle errors from API
   */
  useEffect(() => {
    if (errorData.error) {
      if (errorData.error.message === 'Network Error') {
        setNetworkError('There has been a network problem' + '\n' + 'Please try again later');
      }
    }
    
  }, [errorData]);

  /**
   * start fetch favorite manga list from presistant / local storage on startup
   */
  useEffect(() => {
    loadData('favorateMangaData').then(data => {
      const d = data != null ? JSON.parse(data) : null;
      setFavoriteArticleData(d);
    });

    loadData('favorateMangaDataIDs').then(data => {
      console.log('favorateMangaDataIDs', data);
      if (data) {
        const dataArr = JSON.parse(data)
        setFavorateMangaDataIDs(dataArr)
      }
    });
  }, []);

  /**
   * here we save to presistant / local when user adds or removes an item from the favorite list
   */
  useEffect(() => {
    // Skip the effect on initial render
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    // concat two object arrays
    const newFavorateMangaData = favorateMangaData.favoriteMangas as never[] as Daum[];
    
    // add new items if neccessary
    const markedArticleData = articleData.filter(el => el.isFavorite === true);
    markedArticleData.forEach((el: Daum) => {
      const favorateMangaDataExist = newFavorateMangaData.find((el2: Daum) => el2.id === el.id)
      if (!favorateMangaDataExist) {
        newFavorateMangaData.push(el as never);
      }
    })

    // if removed item then erase also from favorateMangaData
    const removedArticleData = articleData.filter(el => el.isFavorite !== true);
    for (const child of removedArticleData) {
      const removedArticleDataItem = newFavorateMangaData.find(el2 => el2.id === child.id);
      if (removedArticleDataItem) {
        const index = newFavorateMangaData.indexOf(removedArticleDataItem);
        newFavorateMangaData.splice(index, 1);
      }
    }      

    storeData('favorateMangaData', newFavorateMangaData);
  }, [articleData]);

  /**
   * here we save to presistant / local when user adds or removes an item from the favorite list
   */
  const dispatchFromProps = (item: Daum, actionType: ActionTypes) => {
    dispatch(mangaToFavorites(item, actionType));

    const favorateMangaDataIDsNew = JSON.parse(JSON.stringify(favorateMangaDataIDs)) as string[];
    if (actionType === ActionTypes.ADD) {
      favorateMangaDataIDsNew.push(item.id)
    } else if (actionType === ActionTypes.REMOVE) {
      const isLargeNumber = (element: any) => element === item.id;
      const selectedIndex = favorateMangaDataIDsNew.findIndex(isLargeNumber);
      favorateMangaDataIDsNew.splice(selectedIndex, 1);
    }

    storeData('favorateMangaDataIDs', favorateMangaDataIDsNew);
    setFavorateMangaDataIDs(favorateMangaDataIDsNew)
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
        <MangasList 
          status={status}
          showLoader={showLoader}
          networkError={networkError}
          articleData={articleData}
          setArticleData={(items: Daum[]) => setArticleData(items)}
          dispatchMangaToFavorites={(item: Daum, actionType: ActionTypes) => dispatchFromProps(item, actionType)}></MangasList>
        
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  }
});