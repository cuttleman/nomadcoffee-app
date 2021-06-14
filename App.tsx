import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const onFinish = () => {
    setIsLoading(false);
  };

  const preLoad = async (): Promise<void> => {
    const images = [require("./assets/coffee.png")];
    const fonts = [Ionicons.font];
    const loadedImages = images.map(async (image) =>
      Asset.fromModule(image).downloadAsync()
    );
    const loadedFonts = fonts.map(async (font) => Font.loadAsync(font));
    Promise.all([loadedImages, loadedFonts]);
    throw Error("Test Error 😰");
  };

  if (isLoading) {
    return (
      <AppLoading
        startAsync={preLoad}
        onError={(e) => Alert.alert("!!Error", e.message)}
        onFinish={onFinish}
      />
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Hello World!</Text>
    </View>
  );
};

export default App;
