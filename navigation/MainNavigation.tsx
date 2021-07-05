import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import TabNavigation from "./TabNavigation";
import UploadNavigation from "./UploadNavigation";

const Stack = createStackNavigator();

const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
        }}
        mode="modal"
      >
        <Stack.Screen name="tabs" component={TabNavigation} />
        <Stack.Screen name="upload" component={UploadNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
