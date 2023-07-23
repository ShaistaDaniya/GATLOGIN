import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import store from './Store';
import Screen1 from './Screen1';
import Screen2 from './Screen2';
import Screen3 from './Screen3';
import Screen4 from './Screen4'; 
import Screen5 from './Screen5';
import Screen6 from './Screen6';
import LastScreen from './LastScreen';
import BYEScreen from './Bye';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Screen1" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Screen1" component={Screen1} />
          <Stack.Screen name="Screen2" component={Screen2} />
          <Stack.Screen name="Screen3" component={Screen3} />
          <Stack.Screen name="Screen4" component={Screen4} />
          <Stack.Screen name="Screen5" component={Screen5} />
          <Stack.Screen name="Screen6" component={Screen6} />
          <Stack.Screen name="LastScreen" component={LastScreen} />
          <Stack.Screen name="BYEScreen" component={BYEScreen} />


        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App; 
