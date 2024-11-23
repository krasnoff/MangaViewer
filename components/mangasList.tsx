import { ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import CustomSizeImage from "./customSizeImage";
import Icon from "../assets/icons/icon";
import Loader from "./loader";
import { Daum } from "../types/search-results";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { ActionTypes } from "../enums/action-types";
import { LogEventTypes } from "../enums/log-events-types";
import analytics from '@react-native-firebase/analytics';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginData } from "../interfaces/login-data";
import { addToReadList } from "../store/actions/add-to-read-list";

interface Props {
    status: number,
    showLoader: boolean,
    networkError: string,
    articleData: Daum[],
    setArticleData: (prevArticleData: Daum[]) => void,
    dispatchMangaToFavorites: (item: Daum, actionTypes: ActionTypes) => void,
    favorateMangaDataIDs: string[]
}

type ItemScreenNavigationProp = StackNavigationProp<any, 'Item'>;

export function MangasList(props: Props) {
    const [mangaId, setMangaId] = useState<Daum>();
    const navigation = useNavigation<ItemScreenNavigationProp>();
    const data = useSelector(state => (state as unknown as any).LoginResponse);
    const dispatch = useDispatch();
    const addToReadListData = useSelector(state => (state as unknown as any).AddToReadListResponse);
    const errorData = useSelector(state => (state as unknown as any).ErrorResponse);
    let routes: any = [];
    let target = '';
    
    let loginData: LoginData;
    
    const toggleFavoritesHandler = (item: Daum) => {
        const prevArticleData = JSON.parse(JSON.stringify(props.articleData)) as Daum[];
        const chosenManga = prevArticleData.find(el => el.id === item.id);
        if (chosenManga) {
          if (props.favorateMangaDataIDs.indexOf(item.id) > -1) {
            props.dispatchMangaToFavorites(item, ActionTypes.REMOVE); 
            logEvent(item, LogEventTypes.TOGGLE_FAVORITE_OFF);
            ToastAndroid.show('This manga has been removed from your favorites', ToastAndroid.SHORT);
          } else {
            props.dispatchMangaToFavorites(item, ActionTypes.ADD);
            logEvent(item, LogEventTypes.TOGGLE_FAVORITE_ON);
            ToastAndroid.show('This manga has been added to your favorites', ToastAndroid.SHORT);
          }
        }
    
        props.setArticleData(prevArticleData);
    }

    const toggleBookmarksHandler = (item: Daum) => {
      if (!data.loginResponse.data) {
        setMangaId(item);
        navigation.navigate('Login', {});
      } else {
        dispatch(addToReadList(
          'reading',
          data.loginResponse.data.token_type + ' ' + data.loginResponse.data.access_token,
          `${process.env.REACT_APP_BASE_URL}/manga/${mangaId?.id}/status`
        ));
      }
      
    }

    useEffect(() => {
      const unsubscribeBState = navigation.addListener("state", (e) => {
        routes = e.data.state.routes;
      });

      const unsubscribeBeforeRemove = navigation.addListener("focus", (e) => {
        target = e.target || '';
        const index = routes.findIndex((element: any) => element.key === target);

        if (index >= 0) {
          if (routes[index + 1] && routes[index + 1].name === 'Login') {
            if (data.loginResponse.data) {
              ToastAndroid.show('Now you can choose what to send to the reading list', ToastAndroid.SHORT);
            }
          }
        }
      });

      return () => {
        unsubscribeBState();
        unsubscribeBeforeRemove();
      };
    }, [navigation]);

    useEffect(() => {
      loginData = data.loginResponse.data;
    }, [data]);

    /**
     * handling successful request
     */
    useEffect(() => {
      // console.log('addToReadListData', addToReadListData.addToReadListResponse);
      ToastAndroid.show('Adding success', ToastAndroid.SHORT);
    }, [addToReadListData]);

    /**
     * error handling in send request
     */
    useEffect(() => {
      console.log('errorData', errorData)
    }, [errorData]);

    const logEvent = async (item: Daum, logEventType: LogEventTypes) => {
      await analytics().logEvent(logEventType, item)
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
                      <View style={stylesItemContainer.iconsArr}>
                        <TouchableOpacity onPress={() => toggleFavoritesHandler(item)} style={styles.favorite}>
                          <Icon name={props.favorateMangaDataIDs.indexOf(item.id) > -1 ? 'FavoriteMarked' : 'Favorite'} height="20" width="20" fill={props.favorateMangaDataIDs.indexOf(item.id) > -1 ? '#00FF00' : '#FF0000'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => toggleBookmarksHandler(item)} style={styles.favorite}>
                          <Icon name={false ? 'BookMarkMarked' : 'BookMark'} height="20" width="20" fill={false ? '#00FF00' : '#FF0000'} />
                        </TouchableOpacity>
                      </View>
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
      paddingTop: 15,
      paddingRight: 15
    }
  });

  const stylesItemContainer = StyleSheet.create({
    iconsArr: {
      flexDirection: 'row'
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

