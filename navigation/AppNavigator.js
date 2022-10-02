import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { ArticleScreen } from '../screens/ArticleScreen';
import ClipScreen from '../screens/ClipScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      {/* optionsのheaderShownでヘッダーを非表示にする。 */}
      {/* componentでコンポーネント名を指定する */}
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Article" component={ArticleScreen} />
    </Stack.Navigator>
  );
};

const ClipStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Clip"
        component={ClipScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Article" component={ArticleScreen} />
    </Stack.Navigator>
  );
};

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="home"
          component={HomeStack}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="clip"
          component={ClipStack}
          options={{
            tabBarLabel: 'Clip',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="bookmark"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

// export default AppNavigator;
