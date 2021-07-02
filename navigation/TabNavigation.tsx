import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Home from "../screens/Home";
import Search from "../screens/Search";
import ProfileNavigation from "../navigation/ProfileNavigation";

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
    <Tab.Navigator
      activeColor="black"
      inactiveColor="#b2bec3"
      barStyle={{ backgroundColor: "white" }}
      shifting={true}
    >
      <Tab.Screen
        name="home"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name={"home"} color={color} style={{ fontSize: 25 }} />
          ),
        }}
      >
        {() => StackFactory([{ name: "home", component: Home }])}
      </Tab.Screen>
      <Tab.Screen
        name="search"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name={"search"} color={color} style={{ fontSize: 25 }} />
          ),
        }}
      >
        {() => StackFactory([{ name: "search", component: Search }])}
      </Tab.Screen>
      <Tab.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name={"person"} color={color} style={{ fontSize: 25 }} />
          ),
        }}
      >
        {() =>
          StackFactory([{ name: "profile", component: ProfileNavigation }])
        }
      </Tab.Screen>
      <Tab.Screen
        name="fakeUpload"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons
              name={"add-circle-outline"}
              color={color}
              style={{ fontSize: 25 }}
            />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("upload");
          },
        })}
        component={View}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
