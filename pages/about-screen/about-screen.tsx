import React, { useState } from 'react';
import { Pressable, Text } from 'react-native';
import ContentPageFrame from '../../components/content-page-frame';
import styles from '../../styles/content-page-style';
import { useLink } from '../../hooks/useLink';

function AboutScreen({ route, navigation }: any): JSX.Element {
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
                <Text style={styles.subTitle}>About MangaViewer</Text>
                <Text style={styles.text}>
                    Welcome to MangaViewer, your go-to app for accessing free manga pages provided by MangaDex.
                </Text>
                <Text style={[styles.subTitle, styles.marginTop]}>About the App:</Text>
                <Text style={styles.text}>
                    MangaViewer is a mobile application built using React Native, designed to provide users with a seamless experience for reading manga on the go.
                </Text>
                <Text style={[styles.subTitle, styles.marginTop]}>Source Code:</Text>
                <Text style={styles.text}>
                    Interested in how MangaViewer was built? You can find the complete source code for this application on GitHub. Feel free to explore, contribute, or fork the repository at 
                    <Text 
                        onPressIn={() => chapterPressInHandler('github')}  
                        onPressOut={() => chapterPressOutHandler()}
                        onPress={() => chapterPressHandler('https://github.com/krasnoff/MangaViewer')}
                        style={[styles.text, styles.pressableMarginTop, {color: activeIndex === 'github' ? 'red': 'blue'}]}> https://github.com/krasnoff/MangaViewer.</Text>
                </Text>
                <Text style={[styles.subTitle, styles.marginTop]}>Developer:</Text>
                <Text style={styles.text}>
                    MangaViewer was developed by Kobi Krasnoff. You can learn more about me and my other projects on my personal website: 
                    <Text 
                        onPressIn={() => chapterPressInHandler('vercel')}  
                        onPressOut={() => chapterPressOutHandler()}
                        onPress={() => chapterPressHandler('https://krasnoff-personal-web-app.vercel.app/')}
                        style={[styles.text, styles.pressableMarginTop, {color: activeIndex === 'vercel' ? 'red': 'blue'}]}>https://krasnoff-personal-web-app.vercel.app/.</Text>
                </Text>
            </>
        </ContentPageFrame>
    );
}

export default AboutScreen;