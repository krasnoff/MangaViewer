import { Button, Image, ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getSimpleSearch } from "../../store/actions/simpleSearch";
import { useEffect, useState } from "react";
import { BACKGROUND_IMAGE } from "../../assets/images";
import { Daum } from "../../types/search-results";
import Loader from "../../components/loader";
import { useUtilData } from "../../hooks/useParseData";
import CustomSizeImage from "../../components/customSizeImage";

export function HomeScreen() {
  const dispatch = useDispatch();
  const data = useSelector(state => (state as unknown as any).SimpleSearchResponse);
  const errorData = useSelector(state => (state as unknown as any).ErrorResponse);
  
  const [status, setStatus] = useState<number>(0);
  const [networkError, setNetworkError] = useState<string>('');
  const [articleData, setArticleData] = useState<Daum[]>([]);

  const [showLoader, setShowLoader] = useState<boolean>(false);

  const {parseIncomingData} = useUtilData()

  useEffect(() => {
    setShowLoader(true);
    dispatch(getSimpleSearch()); 
  }, [dispatch]);

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
      console.log('useSelector error...', errorData.error);
      if (errorData.error.message === 'Network Error') {
        setNetworkError('There has been a network problem' + '\n' + 'Please try again later');
      }
    }
    
  }, [errorData]);

  // const buttonPressHandler = () => {
  //   setShowLoader(true);
  //   dispatch(getSimpleSearch()); 
  // }

  return (
    <ImageBackground source={BACKGROUND_IMAGE} resizeMode="cover" style={styles.image}>
      <View style={styles.view}>
        {status === 503 ? <Text style={styles.text}>Main server is down for maintanence.{'\n'}Please try again later.</Text> : null}
        {networkError !== '' ? <Text style={styles.text}>{networkError}</Text> : null}
        {networkError === '' && status === 200 && articleData.length === 0 ? <Text style={styles.text}>No stories for this search</Text> : null}
        {networkError === '' && status === 200 && articleData.length > 0 ? 
          <ScrollView contentContainerStyle={stylesSCrollView.scrollViewContent}>
          {articleData.map(item => (
            <View key={item.id} style={stylesSCrollView.itemContainer}>
              <CustomSizeImage source={{ uri: item.coverImgURL }} />
              <View style={stylesSCrollView.itemTextContainer}>
                <Text style={stylesSCrollView.itemTitle}>{item.attributes.title.en}</Text>
                <Text style={stylesSCrollView.itemDescription} numberOfLines={10}>{item.attributes.description.en}</Text>
              </View>
            </View>
          ))}
          </ScrollView>
        : null}
        {/* <Button onPress={() => buttonPressHandler()} title="Press Me"></Button> */}
      </View>
      {showLoader ?
        <Loader></Loader>
      : null}
    </ImageBackground>
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
  }
});

const stylesSCrollView = StyleSheet.create({
  scrollViewContent: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: '100%'
  },
  itemContainer: {
    flexDirection: 'row',
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
  itemTextContainer: {
    flex: 1,
    padding: 10,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 16,
  },
});