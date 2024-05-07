import React from 'react';
import { Text } from 'react-native';
import ContentPageFrame from '../../components/content-page-frame';
import styles from '../../styles/content-page-style';
import PressableLink from '../../components/pressable-link';

function AboutScreen({ route, navigation }: any): JSX.Element {
    return (
        <ContentPageFrame>
            <>
                <Text style={styles.subTitle}>About MangaViewer</Text>
                <Text style={styles.text}>
                    Welcome to MangaViewer, your go-to app for accessing free manga pages provided by
                    <PressableLink url={'https://mangadex.org/'}> MangaDex.</PressableLink> 
                </Text>
                <Text style={[styles.subTitle, styles.marginTop]}>About the App:</Text>
                <Text style={styles.text}>
                    MangaViewer is a mobile application built using React Native, designed to provide users with a seamless experience for reading manga on the go.
                </Text>
                <Text style={[styles.subTitle, styles.marginTop]}>Source Code:</Text>
                <Text style={styles.text}>
                    Interested in how MangaViewer was built? You can find the complete source code for this application on GitHub. Feel free to explore, contribute, or fork the repository at 
                    <PressableLink url={'https://github.com/krasnoff/MangaViewer'}> https://github.com/krasnoff/MangaViewer.</PressableLink>
                </Text>
                <Text style={[styles.subTitle, styles.marginTop]}>Developer:</Text>
                <Text style={styles.text}>
                    MangaViewer was developed by Kobi Krasnoff. You can learn more about me and my other projects on my personal website: 
                    <PressableLink url={'https://krasnoff-personal-web-app.vercel.app/'}> https://krasnoff-personal-web-app.vercel.app/.</PressableLink>
                </Text>
            </>
        </ContentPageFrame>
    );
}

export default AboutScreen;