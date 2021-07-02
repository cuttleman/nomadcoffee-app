import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import Select from "../screens/Select";
import Take from "../screens/Take";
import UploadForm from "../screens/partials/UploadForm";

const MaterialTab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const UploadNavigation = () => {
  return (
    <MaterialTab.Navigator
      tabBarPosition="bottom"
      tabBarOptions={{ indicatorStyle: { top: 0, backgroundColor: "black" } }}
    >
      <MaterialTab.Screen name="selectTab" options={{ title: "select" }}>
        {() => (
          <Stack.Navigator
            screenOptions={{
              headerTitle: "",
              headerBackImage: () => <Ionicons name="close" size={30} />,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          >
            <Stack.Screen name="select" component={Select} />
            <Stack.Screen name="uploadForm" component={UploadForm} />
          </Stack.Navigator>
        )}
      </MaterialTab.Screen>
      <MaterialTab.Screen name="takeTab" options={{ title: "take" }}>
        {() => (
          <Stack.Navigator
            screenOptions={{
              headerBackImage: () => <Ionicons name="close" size={30} />,
            }}
          >
            <Stack.Screen name="take" component={Take} />
          </Stack.Navigator>
        )}
      </MaterialTab.Screen>
    </MaterialTab.Navigator>
  );
};

export default UploadNavigation;
