import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Profile from "../screens/Profile";

interface StackProps {
  name: string;
  component: React.FC<any>;
}

const Tab = createMaterialBottomTabNavigator();

const Stack = createStackNavigator();

const StackFactory = (components: StackProps[]) => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      {components.map(({ name, component }, idx) => (
        <Stack.Screen key={idx} name={name} component={component} />
      ))}
    </Stack.Navigator>
  );
};

const TabNavigation: React.FC = () => {
  return (
    <Tab.Navigator initialRouteName="search">
      <Tab.Screen name="home">
        {() => StackFactory([{ name: "home", component: Home }])}
      </Tab.Screen>
      <Tab.Screen name="search">
        {() => StackFactory([{ name: "search", component: Search }])}
      </Tab.Screen>
      <Tab.Screen name="profile">
        {() => StackFactory([{ name: "profile", component: Profile }])}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabNavigation;
