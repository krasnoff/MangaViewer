import { Button, ImageBackground, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getSimpleSearch } from "../../store/actions/simpleSearch";
import { useEffect, useState } from "react";
import { BACKGROUND_IMAGE } from "../../assets/images";
import { SearchResults } from "../../types/search-results";

export function HomeScreen() {
  const dispatch = useDispatch();
  const data = useSelector(state => (state as unknown as any).SimpleSearchResponse);
  
  const [status, setStatus] = useState<number>(0);

  useEffect(() => {
    dispatch(getSimpleSearch()); 
  }, [dispatch]);

  useEffect(() => {
    console.log('useSelector output result with data...', data);
    
    if (data.simpleSearchResponse.status === 200) {
      const resData: SearchResults = data.simpleSearchResponse.data;
    }

    setStatus(data.simpleSearchResponse.status);
  }, [data]);

  const buttonPressHandler = () => {
    dispatch(getSimpleSearch()); 
  }

  return (
    <ImageBackground source={BACKGROUND_IMAGE} resizeMode="cover" style={styles.image}>
      <View style={styles.view}>
        {status === 503 ? <Text style={styles.text}>Main server is down for maintanence.{'\n'}Please try again later.</Text> : null}
        
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
    fontSize: 20
  }
});