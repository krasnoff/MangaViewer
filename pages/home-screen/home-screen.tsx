import { ImageBackground, SafeAreaView, StatusBar, StyleSheet, ToastAndroid } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getSimpleSearch } from "../../store/actions/simpleSearch";
import { useContext, useEffect, useRef, useState } from "react";
import { BACKGROUND_IMAGE } from "../../assets/images";
import { Daum } from "../../types/search-results";
import { useUtilData } from "../../hooks/useParseData";
import { ThemeContext } from "../../contexts/themeContext";
import { useStorage } from "../../hooks/useStorage";
import { useIsFocused } from "@react-navigation/native";
import { MangasList } from "../../components/mangasList";
import { ActionTypes } from "../../enums/action-types";
import crashlytics from '@react-native-firebase/crashlytics';
import { getTagsList } from "../../store/actions/tags-list";
import { Daum2, TagsList } from "../../types/tags";

export function HomeScreen({ route, navigation }: any) {
  const dispatch = useDispatch();
  const data = useSelector(state => (state as unknown as any).SimpleSearchResponse);
  const errorData = useSelector(state => (state as unknown as any).ErrorResponse);
  const tagsData = useSelector(state => (state as unknown as any).TagsListResponse);
        
  const [status, setStatus] = useState<number>(-1);
  const [networkError, setNetworkError] = useState<string>('');
  const [articleData, setArticleData] = useState<Daum[]>([]);
    
  const [showLoader, setShowLoader] = useState<boolean>(true);

  const {parseIncomingData} = useUtilData();
  const theme = useContext(ThemeContext);

  const {storeData, loadData, dispatchFromPropsFunc} = useStorage();
  const [favorateMangaDataIDs, setFavorateMangaDataIDs] = useState<string[]>([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      

      dispatch(getTagsList());
    }
  }, [isFocused, route.params]);

  /**
   * start fetch favorite manga list from presistant / local storage on startup or every time this page is focused
   */
  useEffect(() => {
    if (isFocused) {
      loadData('favorateMangaDataIDs').then(data => {
        //console.log('favorateMangaDataIDs', data);
        if (data) {
          const dataArr = JSON.parse(data)
          setFavorateMangaDataIDs(dataArr)
          //console.log('favorateMangaDataIDs on load', dataArr)
        }
      });

    }
  }, [isFocused]);
  
  /**
   * start fetch initial call to manga group items
   */
  useEffect(() => {
    setStatus(-1);
    setShowLoader(true);
    dispatch(getSimpleSearch(theme)); 
  }, [theme]);

  /**
   * gets tags list from server
   */
  useEffect(() => {
    const tagsResponse: any = tagsData.tagsResponse;
    //console.log('tagsData tagsResponse 2', JSON.stringify(tagsResponse.data.data));

    let excluded_tag_name: Daum2[] = tagsResponse.data?.data; 
    if (excluded_tag_name) {
      excluded_tag_name = Object.values(excluded_tag_name).filter((el: Daum2) => el.attributes && ["Long Strip"].includes(el.attributes.name.en));
      let excluded_tag_ids;
      if (excluded_tag_name && excluded_tag_name.length > 0) {
        excluded_tag_ids = excluded_tag_name.map(el => el.id);
      }
      
      console.log('tagsData 3c', excluded_tag_ids);
      if (route.params?.IDs) {
        setStatus(-1);
        setShowLoader(true);
        dispatch(getSimpleSearch(undefined, route.params.IDs, excluded_tag_ids)); 
      } else {
        dispatch(getSimpleSearch()); 
      }
    }

  }, [tagsData]);

  /**
   * recieves initial call of manga groups from mangadex server
   */
  useEffect(() => {
    setNetworkError('');
    
    if (data.simpleSearchResponse.status === 200) {
      if (data.simpleSearchResponse.data.result === 'ok') {
        let resData = parseIncomingData(data.simpleSearchResponse.data.data) as Daum[];
        setArticleData(resData);
      } else {
        setArticleData([]);
      }
      
    }

    setStatus(data.simpleSearchResponse.status);
    setShowLoader(false);
  }, [data]);

  /**
   * handle errors from API
   */
  useEffect(() => {
    if (errorData.error) {
      if (errorData.error.message === 'Network Error') {
        setNetworkError('There has been a network problem' + '\n' + 'Please try again later');
        reportError(errorData);
      }
    }
    
  }, [errorData]);

  async function reportError(errorData: any) {
    crashlytics().log('User signed in.');
    await Promise.all([
      crashlytics().setAttributes({'error_message_send_api': errorData}),
    ]);
  }

  /**
   * here we save to presistant / local when user adds or removes an item from the favorite list
   */
  const dispatchFromProps = (item: Daum, actionType: ActionTypes) => {
    const favorateMangaDataIDsNew = dispatchFromPropsFunc(item, actionType, favorateMangaDataIDs);

    storeData('favorateMangaDataIDs', favorateMangaDataIDsNew);
    setFavorateMangaDataIDs(favorateMangaDataIDsNew);
    // console.log(favorateMangaDataIDsNew);
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
          dispatchMangaToFavorites={(item: Daum, actionType: ActionTypes) => dispatchFromProps(item, actionType)}
          favorateMangaDataIDs={favorateMangaDataIDs}></MangasList>
        
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