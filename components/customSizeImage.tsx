import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Image } from '@rneui/themed';

export default function CustomSizeImage(props: any) {
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);

  useEffect(() => {
    Image.getSize(props.source.uri, (w, h) => {
        setWidth(100);
        setHeight(100 * h / w);
    });
  }, []);

  return (
    <View style={{width: width, height: height, marginRight: 10}}>
      <Image
        source={props.source}
        style={ styles.thumbnail }
        PlaceholderContent={<ActivityIndicator />} />
    </View>
  );
}

const styles = StyleSheet.create({
    thumbnail: {
        borderRadius: 8,
        marginTop: 10,
        marginLeft: 10,
        width: '100%',
        height: '100%'
    },
});