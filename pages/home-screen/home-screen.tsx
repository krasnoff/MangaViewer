import { Text, View } from "react-native";

export function HomeScreen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{fontFamily: 'Bangers-Regular', fontSize: 30}}>External Home Screen</Text>
      </View>
    );
  }