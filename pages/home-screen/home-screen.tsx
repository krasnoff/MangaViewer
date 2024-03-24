import { Button, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getSimpleSearch } from "../../store/actions/simpleSearch";
import { useEffect } from "react";

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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontFamily: 'Bangers-Regular', fontSize: 30}}>External Home Screen</Text>
      <Button onPress={() => buttonPressHandler()} title="Press Me"></Button>
    </View>
  );
}