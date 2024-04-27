// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeStackNavigationOptions, createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './pages/home-screen/home-screen';
import { useCallback, useMemo, useRef, useState, type PropsWithChildren } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ANIME_STUB_IMAGE } from './assets/images';
import configureStore from './store/store';
import watcherSaga from './store/sagas/data-summary';
import { Provider } from 'react-redux';
import ItemScreen from './pages/item-screen/item-screen';
import PagesScreen from './pages/pages-screen/pages-screen';
import Icon from './assets/icons/icon';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import BulletedList from './components/bulletedList ';
import CreditsScreen from './pages/credits-screen/credits-screen';
import AboutScreen from './pages/about-screen/about-screen';
import { BottomSheetItemObj } from './types/bottom-sheet-item-types';
import SearchForm from './components/searchForm';
import { ThemeContext } from './contexts/themeContext';


const store = configureStore();
store.runSaga(watcherSaga);

type Props = PropsWithChildren<{
  title: string;
}>;

function LogoTitle(props: Props) {
  return (
    <View style={{flexDirection: 'row', justifyContent:'center'}}>
      <Image source={ ANIME_STUB_IMAGE } style={{width: 50, height: 42, paddingRight: 20}} />
      <Text style={{ 
        fontFamily: 'Bangers-Regular', 
        fontSize: 28,
      }}>{props.title}</Text>
    </View>
  );
}

interface MenuProps {
  bottomSheetRef: React.RefObject<BottomSheetMethods>
}

function MenuButton(props: MenuProps) {
  const menuButtonHandler = (bottomSheetRef: React.RefObject<BottomSheetMethods>) => {
    bottomSheetRef.current!.expand();
  }

  return (
    <TouchableOpacity onPress={() => menuButtonHandler(props.bottomSheetRef) }>
      <Icon name="Menu" height="35" width="35" fill="#000000" />
    </TouchableOpacity>
  );
}

const customHeaderDesign: NativeStackNavigationOptions = {
  // title: 'כותרת לדוגמה',
  headerStyle: {
    backgroundColor: '#FFFF00',
  },
  headerTintColor: '#000000',
  headerTitleStyle: {
    color: '#000000'
  },
  headerTitleAlign: "center",
  headerShadowVisible: true,
}

const Stack = createNativeStackNavigator();

const App = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [searchWord, setSearchWord] = useState<string>('');

  const handleSheetChanges = useCallback((index: number) => {
    if (index === 0) {
      bottomSheetRef.current!.close();
    }
  }, []);

  const snapPoints = useMemo(() => [1, '50%'], []);

  const renderBackdrop = useCallback(
		(props: any) => (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={0}
				appearsOnIndex={1}
			/>
		),
		[]
	);

  const bottomSheetItems: BottomSheetItemObj[] = [{
    title: 'Credits',
    url: 'Credits'
  }, {
    title: 'About',
    url: 'About'
  }];

  const closeBottomSheetHandler = () => {
    bottomSheetRef.current!.close();
  }

  const searchHandler = (searchWord: string) => {
    setSearchWord(searchWord);
    
    setTimeout(() => {
      handleClosePress();
    }, 500)
  }

  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  return (
    <Provider store={store}>
      <ThemeContext.Provider value={searchWord}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={customHeaderDesign}>
              <Stack.Screen 
                name="Home" 
                component={HomeScreen}
                options={{
                  headerTitle: (() => <LogoTitle title={'Manga Viewer'} />),
                  headerRight: (() => <MenuButton bottomSheetRef={bottomSheetRef} />)
              }} />
              <Stack.Screen 
                name="Item" 
                component={ItemScreen}
                options={{
                  headerTitle: (() => <LogoTitle title={'Manga Viewer'} />),
                  headerRight: (() => <MenuButton bottomSheetRef={bottomSheetRef} />)
              }} />
              <Stack.Screen 
                name="Pages" 
                component={PagesScreen}
                options={{
                  headerTitle: (() => <LogoTitle title={'Manga Viewer'} />),
                  headerRight: (() => <MenuButton bottomSheetRef={bottomSheetRef} />)
              }} />
              <Stack.Screen 
                name="Credits" 
                component={CreditsScreen}
                options={{
                  headerTitle: (() => <LogoTitle title={'Manga Viewer'} />),
                  headerRight: (() => <MenuButton bottomSheetRef={bottomSheetRef} />)
              }} />
              <Stack.Screen 
                name="About" 
                component={AboutScreen}
                options={{
                  headerTitle: (() => <LogoTitle title={'Manga Viewer'} />),
                  headerRight: (() => <MenuButton bottomSheetRef={bottomSheetRef} />)
              }} />
            </Stack.Navigator>
            <BottomSheet
              ref={bottomSheetRef}
              onChange={handleSheetChanges}
              snapPoints={snapPoints}
              backdropComponent={renderBackdrop}
              index={-1}
              style={styles.shadow}
            >
              <BottomSheetView style={styles.contentContainer}>
                <SearchForm searchHandler={(searchWord: string) => searchHandler(searchWord)} />
                <BulletedList items={bottomSheetItems} closeBottomSheetHandler={() => closeBottomSheetHandler()}></BulletedList>
              </BottomSheetView>
            </BottomSheet>
          </NavigationContainer>
        </GestureHandlerRootView>
      </ThemeContext.Provider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  container: {
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  }
});

export default App;