import React, { useState } from 'react';
import { Pressable, Text } from 'react-native';
import ContentPageFrame from '../../components/content-page-frame';
import styles from '../../styles/content-page-style';
import { useLink } from '../../hooks/useLink';

function CreditsScreen({ route, navigation }: any): JSX.Element {
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
        <ContentPageFrame>
            <>
                <Text style={styles.subTitle}>Credits for the content:</Text>
                <Text style={styles.text}>
                    I extend my heartfelt gratitude to MangaDex and its dedicated scanlation groups for their unwavering commitment to bringing manga to a global audience. Their tireless efforts in translating, editing, and sharing manga have enriched the lives of countless readers, fostering a vibrant community of manga enthusiasts worldwide.
                </Text>
                <Pressable 
                  onPressIn={() => chapterPressInHandler('mangadex')}  
                  onPressOut={() => chapterPressOutHandler()}
                  onPress={() => chapterPressHandler('https://mangadex.org/')}>
                    <Text style={[styles.text, , {color: activeIndex === 'mangadex' ? 'red': 'blue'}]}>Here is the MangaDex website link</Text>
                </Pressable>
                <Text style={[styles.subTitle, styles.marginTop]}>Credits for the app logo:</Text>
                <Text style={styles.text}>
                    This logo that appears on the header and on the app icon was originally designed by
                    <Text 
                        onPressIn={() => chapterPressInHandler('Kasuga')}
                        onPressOut={() => chapterPressOutHandler()}
                        onPress={() => chapterPressHandler('https://meta.wikimedia.org/wiki/User:Kasuga~metawiki')}
                        style={[styles.text, styles.pressableMarginTop, {color: activeIndex === 'Kasuga' ? 'red': 'blue'}]}> Kasuga. </Text>
                    The logo graphic file of the header and the app icon files are distributed under
                    <Text 
                        onPressIn={() => chapterPressInHandler('cc')}  
                        onPressOut={() => chapterPressOutHandler()}
                        onPress={() => chapterPressHandler('https://creativecommons.org/licenses/by-sa/3.0/deed.en')}
                        style={[styles.text, styles.pressableMarginTop, {color: activeIndex === 'cc' ? 'red': 'blue'}]}> Creative Commons license </Text>
                        (CC BY-SA 3.0 DEED)
                </Text>
                <Text style={[styles.subTitle, styles.marginTop]}>Application header credit for special fonts</Text>
                <Text style={styles.text}>
                    This is a 
                    <Text 
                        onPressIn={() => chapterPressInHandler('bangers')}  
                        onPressOut={() => chapterPressOutHandler()}
                        onPress={() => chapterPressHandler('https://fonts.google.com/specimen/Bangers/about?query=Bangers')}
                        style={[styles.text, styles.pressableMarginTop, {color: activeIndex === 'bangers' ? 'red': 'blue'}]}> "Bangers" </Text> 
                    font. Designed by Vernon Adams. This font is distributed under 
                    <Text 
                        onPressIn={() => chapterPressInHandler('ofl')}  
                        onPressOut={() => chapterPressOutHandler()}
                        onPress={() => chapterPressHandler('https://openfontlicense.org/open-font-license-official-text/')}
                        style={[styles.text, styles.pressableMarginTop, {color: activeIndex === 'ofl' ? 'red': 'blue'}]}> OFL </Text> 
                    license.
                </Text>
                <Text style={[styles.subTitle, styles.marginTop]}>Icons used in this app</Text>
                <Text style={styles.text}>
                    The icons used in this app are part of 
                    <Text 
                            onPressIn={() => chapterPressInHandler('material')}  
                            onPressOut={() => chapterPressOutHandler()}
                            onPress={() => chapterPressHandler('https://fonts.google.com/icons?icon.platform=web')}
                            style={[styles.text, styles.pressableMarginTop, {color: activeIndex === 'material' ? 'red': 'blue'}]}> "Material Symbols" </Text>
                    icons and are distributed under 
                    <Text 
                            onPressIn={() => chapterPressInHandler('apache')}  
                            onPressOut={() => chapterPressOutHandler()}
                            onPress={() => chapterPressHandler('https://www.apache.org/licenses/LICENSE-2.0.html')}
                            style={[styles.text, styles.pressableMarginTop, {color: activeIndex === 'apache' ? 'red': 'blue'}]}> Apache license. </Text>
                </Text>
                <Text style={[styles.subTitle, styles.marginTop]}>Background Image</Text>
                <Text style={styles.text}>
                    The background image in this app is provided by 
                    <Text 
                            onPressIn={() => chapterPressInHandler('freepic')}  
                            onPressOut={() => chapterPressOutHandler()}
                            onPress={() => chapterPressHandler('https://www.freepik.com/free-vector/zoom-effect-background_32375309.htm#query=manga%20background&position=1&from_view=keyword&track=ais&uuid=1aff79b9-19e9-46df-a555-608f0d7b3406')}
                            style={[styles.text, styles.pressableMarginTop, {color: activeIndex === 'freepic' ? 'red': 'blue'}]}> Freepic.</Text>
                </Text>
            </>
        </ContentPageFrame>
    );
}

export default CreditsScreen;