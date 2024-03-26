import { Button, ImageBackground, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getSimpleSearch } from "../../store/actions/simpleSearch";
import { useEffect } from "react";
import { BACKGROUND_IMAGE } from "../../assets/images";

export function HomeScreen() {
  const dispatch = useDispatch();
  const data = useSelector(state => (state as unknown as any).SimpleSearchResponse);

  useEffect(() => {
    // console.log('useDispatch...')
    dispatch(getSimpleSearch()); 
  }, [dispatch]);

  useEffect(() => {
    console.log('useSelector output result with data...', data)
  }, [data]);

  const buttonPressHandler = () => {
    dispatch(getSimpleSearch()); 
  }

  return (
    <ImageBackground source={BACKGROUND_IMAGE} resizeMode="cover" style={styles.image}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <Text style={{fontFamily: 'Bangers-Regular', fontSize: 30}}>External Home Screen</Text>
        <Button onPress={() => buttonPressHandler()} title="Press Me"></Button>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  }
});