import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Home from "../screens/Home";
import Search from "../screens/Search";
import ProfileNavigation from "./ProfileNavigation";

const Tab = createMaterialBottomTabNavigator();

const TabNavigation: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="search" component={Search} />
      <Tab.Screen name="profile" component={ProfileNavigation} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
