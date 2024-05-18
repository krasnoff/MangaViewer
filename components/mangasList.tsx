import { ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import CustomSizeImage from "./customSizeImage";
import Icon from "../assets/icons/icon";
import Loader from "./loader";
import { Daum } from "../types/search-results";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { mangaToFavorites } from "../store/actions/favorite-mangas";
import { ActionTypes } from "../enums/action-types";
import { DispatchFromPropsItem } from "../types/dispatch-from-props-item";
import { useEffect } from "react";
import { useStorage } from "../hooks/useStorage";

interface Props {
    status: number,
    showLoader: boolean,
    networkError: string,
    articleData: Daum[],
    setArticleData: (prevArticleData: Daum[]) => void,
    dispatch: (action: DispatchFromPropsItem) => void
}

type ItemScreenNavigationProp = StackNavigationProp<any, 'Item'>;

export function MangasList(props: Props) {
    const navigation = useNavigation<ItemScreenNavigationProp>();
    
    const toggleFavoritesHandler = (item: Daum) => {
        const prevArticleData = JSON.parse(JSON.stringify(props.articleData)) as Daum[];
        const chosenManga = prevArticleData.find(el => el.id === item.id);
        if (chosenManga) {
          
          if (chosenManga.isFavorite === true) {
            chosenManga.isFavorite = false;
            props.dispatch(mangaToFavorites(item, ActionTypes.REMOVE)); 
            ToastAndroid.show('This manga has been removed from your favorites', ToastAndroid.SHORT);
          } else {
            chosenManga.isFavorite = true;
            props.dispatch(mangaToFavorites(item, ActionTypes.ADD));
            ToastAndroid.show('This manga has been added to your favorites', ToastAndroid.SHORT);
          }
        }
    
        props.setArticleData(prevArticleData);
    }
    
    return (
        <View style={styles.view}>
            {props.status === undefined || props.showLoader ? <Loader></Loader> : null}
            {props.status === 500 ? <Text style={styles.text}>There is a malfunction in the main server{'\n'}Please try again later.</Text> : null}
            {props.status === 503 ? <Text style={styles.text}>Main server is down for maintanence.{'\n'}Please try again later.</Text> : null}
            {props.networkError !== '' ? <Text style={styles.text}>{props.networkError}</Text> : null}
            {props.networkError === '' && props.status === 200 && props.articleData.length === 0 ? <Text style={styles.text}>No stories for this search</Text> : null}
            {props.networkError === '' && props.status === 200 && props.articleData.length > 0 ? 
            <ScrollView contentContainerStyle={stylesSCrollView.scrollViewContent}>
            {props.articleData.map(item => (
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