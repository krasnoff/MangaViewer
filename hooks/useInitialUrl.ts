import { useEffect, useState } from "react";
import { Linking } from "react-native";

export function useInitialUrl() {
    const handleDeepLink = (initialUrl: string) => {
        console.log('handleDeepLink', initialUrl);
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