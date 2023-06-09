import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';

import Home from './screens/Home';
import Paid from './screens/Paid';
import Received from './screens/Received';
import MoreInfomation from './screens/MoreInfomation';
import ListItemPaid from './screens/ListItemPaid';
import ListItemRecive from './screens/ListItemRecive';
import SummaryPage from './screens/SummaryPage';
const Stack = createNativeStackNavigator();

type Props = {};

const App = (props: Props) => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={({navigation}) => ({
            headerShown: false,
            headerLeft: () => null, // Remove the back button
          })}
        />
        <Stack.Screen
          name="Paid"
          component={Paid}
          options={{
            title: 'Paid',
            headerTitleStyle: {
              color: 'white',
            },
            headerStyle: {
              backgroundColor: '#ff6961',
            },
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="Received"
          component={Received}
          options={{
            title: 'Received',
            headerTitleStyle: {
              color: 'white',
            },
            headerStyle: {
              backgroundColor: '#92CEA8',
            },
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="MoreInfomation"
          component={MoreInfomation}
          options={{
            title: 'More Infomation',
            headerTitleStyle: {
              color: 'white',
            },
            headerStyle: {
              backgroundColor: '#644536',
            },
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="ListitemPaid"
          component={ListItemPaid}
          options={{
            title: 'Choose items',
            headerTitleStyle: {
              color: 'white',
            },
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#ff6961',
            },
          }}
        />
        <Stack.Screen
          name="ListItemRecive"
          component={ListItemRecive}
          options={{
            title: 'Choose items',
            headerTitleStyle: {
              color: 'white',
            },
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#98D8AA',
            },
          }}
        />
        <Stack.Screen
          name="SummaryPage"
          component={SummaryPage}
          options={({navigation}) => ({
            headerShown: false,
            headerLeft: () => null, // Remove the back button
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
