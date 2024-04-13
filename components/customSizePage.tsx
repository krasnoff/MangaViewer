import { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";

interface Props {
    uri: string
}

export default function CustomSizePage(props: Props) {
    const [imageWidth, setImageWidth] = useState(0);
    const [imageHeight, setImageHeight] = useState(0);

    useEffect(() => {
        getImageSize(props.uri);
    }, []);

    const getImageSize = async (uri: any) => {
        const imageSize = await getImageSizePromise(uri);
        
        const screenWidth = Dimensions.get('window').width;
        const screenHeight = Dimensions.get('window').height;

        // Calculate aspect ratio of the image
        const aspectRatio = imageSize.width / imageSize.height;

        // Calculate scaled dimensions to fit the screen while maintaining aspect ratio
        const screenWidthBasedHeight = screenWidth / aspectRatio;

        // Determine which dimension to use for scaling
        let scaledWidth, scaledHeight;
        if (screenWidthBasedHeight > screenHeight) {
            scaledWidth = screenHeight * aspectRatio;
            scaledHeight = screenHeight;
        } else {
            scaledWidth = screenWidth;
            scaledHeight = screenWidth / aspectRatio;
        }

        setImageWidth(scaledWidth);
        setImageHeight(scaledHeight);
    }

    const getImageSizePromise = (uri: any): Promise<{width: number, height: number}> => {
        return new Promise((resolve, reject) => {
            Image.getSize(uri, (width, height) => {
              // If successful, resolve the promise with the dimensions
              resolve({ width, height });
            }, (error) => {
              // If an error occurs, reject the promise with the error message
              reject(error);
            });
        });
    }

    return (
        <View style={{width: imageWidth, height: imageHeight}}>
          <Image
            source={{uri: props.uri}}
            style={ styles.image } />
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%'
    },
});