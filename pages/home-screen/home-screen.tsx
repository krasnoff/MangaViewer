import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getSimpleSearch } from "../../store/actions/simpleSearch";
import { useEffect } from "react";

export function HomeScreen() {
  const dispatch = useDispatch();
  const data = useSelector(state => (state as unknown as any).simpleSearchResponse);

  useEffect(() => {
    console.log('useDispatch...')
    dispatch(getSimpleSearch()); 
  }, [dispatch]);

  useEffect(() => {
    console.log('useSelector...', data)
  }, [data]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontFamily: 'Bangers-Regular', fontSize: 30}}>External Home Screen</Text>
    </View>
  );
}