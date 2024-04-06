// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeStackNavigationOptions, createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './pages/home-screen/home-screen';
import type {PropsWithChildren} from 'react';
import { Image, Text, View } from 'react-native';

import { ANIME_STUB_IMAGE } from './assets/images';
import configureStore from './store/store';
import watcherSaga from './store/sagas/data-summary';
import { Provider } from 'react-redux';
import ItemScreen from './pages/item-screen/item-screen';
import PagesScreen from './pages/pages-screen/pages-screen';

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

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={customHeaderDesign}>
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{
              headerTitle: (() => <LogoTitle title={'Manga Viewer'} />),
          }} />
          <Stack.Screen 
            name="Item" 
            component={ItemScreen}
            options={{
              headerTitle: (() => <LogoTitle title={'Manga Viewer'} />),
          }} />
          <Stack.Screen 
            name="Pages" 
            component={PagesScreen}
            options={{
              headerTitle: (() => <LogoTitle title={'Manga Viewer'} />),
          }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;