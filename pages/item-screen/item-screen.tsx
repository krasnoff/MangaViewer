import React from 'react';
import { Text, View } from "react-native";

function ItemScreen({ route, navigation }: any): JSX.Element {
    const { itemId } = route.params;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Items Screen</Text>
      </View>
    );
}

export default ItemScreen;