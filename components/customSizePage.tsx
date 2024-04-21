import { useEffect, useState } from "react";
import { ActivityIndicator, DimensionValue, Dimensions, Image as RNImage, StyleSheet, View } from "react-native";
import { Image } from '@rneui/themed';

interface Props {
    uri: string,
    pageIndex: number,
    currentIndex: number
}

export default function CustomSizePage(props: Props) {
    const [imageWidth, setImageWidth] = useState<DimensionValue>('100%');
    const [imageHeight, setImageHeight] = useState<DimensionValue>('100%');
    
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
            RNImage.getSize(uri, (width, height) => {
              // If successful, resolve the promise with the dimensions
              resolve({ width, height });
            }, (error) => {
              // If an error occurs, reject the promise with the error message
              reject(error);
            });
        });
    }

    return (
        <View style={{width: imageWidth, height: imageHeight, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={{uri: props.uri}}
            containerStyle={ styles.image } 
            PlaceholderContent={<ActivityIndicator />}/>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%'
    },
});