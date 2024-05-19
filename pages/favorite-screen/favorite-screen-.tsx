import { ImageBackground, StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BACKGROUND_IMAGE } from "../../assets/images";
import { MangasList } from "../../components/mangasList";
import { Daum } from "../../types/search-results";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useStorage } from "../../hooks/useStorage";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { ActionTypes } from "../../enums/action-types";
import { mangaToFavorites } from "../../store/actions/favorite-mangas";

export function FavoriteScreen({ route, navigation }: any) {
    const [articleData, setArticleData] = useState<Daum[]>([]);
    const dispatch = useDispatch();
    const {storeData, loadData} = useStorage();
    const favorateMangaData = useSelector(state => (state as unknown as any).FavorateMangaResponse);
    const isFocused = useIsFocused();

   useEffect(() => {
        if (isFocused) {
           console.log('In inFocused Block', isFocused);
           loadPersistantData()
        }
    }, [isFocused]);

    // every time we change favorite manga data
    useEffect(() => {
        //console.log('first time it loads');
        //loadPersistantData()
    }, []);

    // every time we change favorite manga data
    useEffect(() => {
        //console.log('favorateMangaData');
        //loadPersistantData()
    }, [favorateMangaData]);

    const loadPersistantData = () => {
        loadData('favorateMangaData').then(data => {
            
            const d = data != null ? JSON.parse(data) : null;

            console.log('useFocusEffect - ', d.length);

            d.forEach((el: Daum) => {
                el.isFavorite = true;
            })

            setArticleData(d)
        });
    }

    const dispatchFromProps = (item: Daum, actionType: ActionTypes) => {
      dispatch(mangaToFavorites(item, actionType));
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
              status={200}
              showLoader={false}
              networkError={''}
              articleData={articleData}
              setArticleData={(items: Daum[]) => setArticleData(items)}
              dispatchMangaToFavorites={(item: Daum, actionType: ActionTypes) => dispatchFromProps(item, actionType)}></MangasList>
            
          </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    image: {
      flex: 1,
      justifyContent: 'center',
    }
});