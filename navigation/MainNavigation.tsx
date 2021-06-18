import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./TabNavigation";

const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <TabNavigation />
    </NavigationContainer>
  );
};

export default Navigation;
