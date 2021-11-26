import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ShowInformation, ShowEpisodeInformation } from '@screens';
import { StatusBar } from 'react-native';

const Stack = createNativeStackNavigator();

export const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="ShowInformation" component={ShowInformation} />
        <Stack.Screen
          name="ShowEpisodeInformation"
          component={ShowEpisodeInformation}
          options={{ presentation: 'modal' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
