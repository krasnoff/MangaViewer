import React from 'react';
import { Text } from 'react-native';
import ContentPageFrame from '../../components/content-page-frame';
import styles from '../../styles/content-page-style';

function CreditsScreen({ route, navigation }: any): JSX.Element {
    return (
        <ContentPageFrame>
            <>
                <Text style={styles.subTitle}>Credits for the content:</Text>
                <Text style={styles.text}>
                    I extend my heartfelt gratitude to MangaDex and its dedicated scanlation groups for their unwavering commitment to bringing manga to a global audience. Their tireless efforts in translating, editing, and sharing manga have enriched the lives of countless readers, fostering a vibrant community of manga enthusiasts worldwide.
                </Text>
                <Text style={styles.text}>Here is the link for MangaDex</Text>
            </>
        </ContentPageFrame>
    );
}

export default CreditsScreen;