import { useState } from "react";
import { useLink } from "../hooks/useLink";
import styles from "../styles/content-page-style";
import { Pressable, Text } from "react-native";

interface Props {
    url: string,
    children: JSX.Element | string
}

function PressableLink(props: Props): JSX.Element {
    const [activeIndex, setActiveIndex] = useState<string>('');
    const { linkToURL } = useLink();
    
    const chapterPressInHandler = (id: string) => {
        setActiveIndex(id)
    }
  
    const chapterPressOutHandler = () => {
        setActiveIndex('')
    }

    const chapterPressHandler = (url: string) => {
        linkToURL(url);
    }
    
    return (
        <Text 
            onPressIn={() => chapterPressInHandler('thisLink')}  
            onPressOut={() => chapterPressOutHandler()}
            onPress={() => chapterPressHandler(props.url)}
            style={[styles.text, , {color: activeIndex === 'thisLink' ? 'red': 'blue'}]}>{props.children}</Text>
    );
}

export default PressableLink;