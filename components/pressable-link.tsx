import { useState } from "react";
import { useLink } from "../hooks/useLink";
import styles from "../styles/content-page-style";
import { Text } from "react-native";
import { LogEventTypes } from "../enums/log-events-types";
import analytics from '@react-native-firebase/analytics';

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
        logEvent(url, LogEventTypes.GO_TO_WEB_PAGE);
        linkToURL(url);
    }

    const logEvent = async (url: string, logEventType: LogEventTypes) => {
        await analytics().logEvent(logEventType, {url: url})
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