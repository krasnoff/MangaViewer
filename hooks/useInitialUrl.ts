import { useEffect } from "react";
import { Linking } from "react-native";

export function useInitialUrl(navigation: React.MutableRefObject<any>) {
    const extractGuid = (url: string) => {
        const match = url.match(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/i);
        return match ? match[0] : '';
    }

    const handleDeepLink = (initialUrl: string) => {
        console.log('handleDeepLink', initialUrl);

        // TODO - sample deep link URL: mangaViewer://item/b227745e-ffbc-4e23-88d0-5f92a538fea1
        
        navigation.current.navigate('Item', {
            itemId: extractGuid(initialUrl),
        });
    }

    // Handle both initial URL and subsequent deep links
    useEffect(() => {
        // Handle initial URL
        const getUrlAsync = async () => {
            const initialUrl = await Linking.getInitialURL();
            if (initialUrl) {
                // Handle initial deep link
                handleDeepLink(initialUrl);
            }
        };

        // Set up event listener for when app is running
        const linkingEventListener = Linking.addEventListener('url', (event) => {
            handleDeepLink(event.url);
        });

        getUrlAsync();

        // Cleanup event listener on unmount
        return () => {
            linkingEventListener.remove();
        };
    }, []);
}