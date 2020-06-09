import 'react-native-gesture-handler';
import * as React from 'react';
import Main from './views/main';
import RegisterDeck from './views/registerdeck';
import SelectCard from './views/selectcard';
import InfoCard from './views/infocard';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            title: 'Home',
            headerStyle: {
              backgroundColor: '#1d1c25',
            },
            headerTintColor: '#FFF',
          }}
        />
        <Stack.Screen
          name="RegisterDeck"
          component={RegisterDeck}
          options={{
            title: 'Register New Deck',
            headerStyle: {
              backgroundColor: '#1d1c25',
            },
            headerTintColor: '#FFF',
          }}
        />
        <Stack.Screen
          name="SelectCard"
          component={SelectCard}
          options={{
            title: 'Select Deck',
            headerStyle: {
              backgroundColor: '#1d1c25',
            },
            headerTintColor: '#FFF',
          }}
        />
        <Stack.Screen
          name="InfoCard"
          component={InfoCard}
          options={{
            title: 'Info Cards',
            headerStyle: {
              backgroundColor: '#1d1c25',
            },
            headerTintColor: '#FFF',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
