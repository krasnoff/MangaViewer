import React from 'react';
import { Text } from 'react-native';
import ContentPageFrame from '../../components/content-page-frame';
import styles from '../../styles/content-page-style';
import PressableLink from '../../components/pressable-link';

function CreditsScreen({ route, navigation }: any): JSX.Element {
    return (
        <ContentPageFrame>
            <>
                <Text style={styles.subTitle}>Credits for the content:</Text>
                <Text style={styles.text}>
                    I extend my heartfelt gratitude to MangaDex and its dedicated scanlation groups for their unwavering commitment to bringing manga to a global audience. Their tireless efforts in translating, editing, and sharing manga have enriched the lives of countless readers, fostering a vibrant community of manga enthusiasts worldwide.
                </Text>
                <PressableLink url={'https://mangadex.org/'}>Here is the MangaDex website link</PressableLink>
                <Text style={[styles.subTitle, styles.marginTop]}>Credits for the app logo:</Text>
                <Text style={styles.text}>
                    This logo that appears on the header and on the app icon was originally designed by
                    <PressableLink url={'https://meta.wikimedia.org/wiki/User:Kasuga~metawiki'}> Kasuga. </PressableLink>
                    The logo graphic file of the header and the app icon files are distributed under
                    <PressableLink url={'https://creativecommons.org/licenses/by-sa/3.0/deed.en'}> Creative Commons license </PressableLink>
                    (CC BY-SA 3.0 DEED)
                </Text>
                <Text style={[styles.subTitle, styles.marginTop]}>Application header credit for special fonts</Text>
                <Text style={styles.text}>
                    This is a 
                    <PressableLink url={'https://fonts.google.com/specimen/Bangers/about?query=Bangers'}> "Bangers" </PressableLink>
                    font. Designed by Vernon Adams. This font is distributed under 
                    <PressableLink url={'https://openfontlicense.org/open-font-license-official-text/'}> OFL </PressableLink>
                    license.
                </Text>
                <Text style={[styles.subTitle, styles.marginTop]}>Icons used in this app</Text>
                <Text style={styles.text}>
                    The icons used in this app are part of 
                    <PressableLink url={'https://fonts.google.com/icons?icon.platform=web'}> "Material Symbols" </PressableLink>
                    icons and are distributed under 
                    <PressableLink url={'https://www.apache.org/licenses/LICENSE-2.0.html'}> Apache license. </PressableLink>
                </Text>
                <Text style={[styles.subTitle, styles.marginTop]}>Background Image</Text>
                <Text style={styles.text}>
                    The background image in this app is provided by 
                    <PressableLink url={'https://www.freepik.com/free-vector/zoom-effect-background_32375309.htm#query=manga%20background&position=1&from_view=keyword&track=ais&uuid=1aff79b9-19e9-46df-a555-608f0d7b3406'}> Freepic. </PressableLink>
                </Text>
            </>
        </ContentPageFrame>
    );
}

export default CreditsScreen;