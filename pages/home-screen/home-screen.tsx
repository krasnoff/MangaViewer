import { Button, ImageBackground, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getSimpleSearch } from "../../store/actions/simpleSearch";
import { useEffect, useState } from "react";
import { BACKGROUND_IMAGE } from "../../assets/images";
import { Daum } from "../../types/search-results";

export function HomeScreen() {
  const dispatch = useDispatch();
  const data = useSelector(state => (state as unknown as any).SimpleSearchResponse);
  const errorData = useSelector(state => (state as unknown as any).ErrorResponse);
  
  const [status, setStatus] = useState<number>(0);
  const [networkError, setNetworkError] = useState<string>('');
  const [articleData, setArticleData] = useState<Daum[]>([]);

  useEffect(() => {
    dispatch(getSimpleSearch()); 
  }, [dispatch]);

  useEffect(() => {
    setNetworkError('');
    
    if (data.simpleSearchResponse.status === 200) {
      if (data.simpleSearchResponse.data.result === 'ok') {
        const resData: Daum[] = data.simpleSearchResponse.data.data;
        setArticleData(resData);
      } else {
        setArticleData([]);
      }
      
    }

    setStatus(data.simpleSearchResponse.status);
  }, [data]);

  useEffect(() => {
    console.log('useSelector error...', errorData.error);
    if (errorData.error) {
      if (errorData.error.message === 'Network Error') {
        setNetworkError('There has been a network problem' + '\n' + 'Please try again later');
      }
    }
    
  }, [errorData]);

  const buttonPressHandler = () => {
    dispatch(getSimpleSearch()); 
  }

  return (
    <ImageBackground source={BACKGROUND_IMAGE} resizeMode="cover" style={styles.image}>
      <View style={styles.view}>
        {status === 503 ? <Text style={styles.text}>Main server is down for maintanence.{'\n'}Please try again later.</Text> : null}
        {networkError !== '' ? <Text style={styles.text}>{networkError}</Text> : null}
        {networkError === '' && status === 200 && articleData.length === 0 ? <Text style={styles.text}>No stories for this search</Text> : null}
        <Button onPress={() => buttonPressHandler()} title="Press Me"></Button>
      </View>
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