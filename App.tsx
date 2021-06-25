import React, { useState } from "react";
import { Alert, Appearance, Text, View } from "react-native";
import { ThemeProvider } from "styled-components/native";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import MainNavigation from "./navigation/MainNavigation";
import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from "@apollo/client";
import client, { cache, isLoggedInVar } from "./apollo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistCache, AsyncStorageWrapper } from "apollo3-cache-persist";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "./theme";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [clientS, setClientS] = useState<
    undefined | ApolloClient<NormalizedCacheObject>
  >(undefined);
  const colorScheme = useColorScheme();

  const onFinish = () => {
    setIsLoading(false);
  };

  const preLoad = async (): Promise<void> => {
    persistCache({ cache, storage: new AsyncStorageWrapper(AsyncStorage) });
    const images = [require("./assets/coffee.png")];
    const fonts = [Ionicons.font];
    const loadedImages = images.map(async (image) =>
      Asset.fromModule(image).downloadAsync()
    );
    const loadedFonts = fonts.map(async (font) => Font.loadAsync(font));
    Promise.all([loadedImages, loadedFonts]);

    const checkUser = await AsyncStorage.getItem("isLoggedIn");
    if (checkUser && checkUser !== null && checkUser !== undefined) {
      isLoggedInVar(true);
    } else {
      isLoggedInVar(false);
    }

    if (client) {
      setClientS(client);
    }
  };

  if (isLoading || !clientS) {
    return (
      <AppLoading
        startAsync={preLoad}
        onError={(e) => Alert.alert("!!Error", e.message)}
        onFinish={onFinish}
        autoHideSplash={true}
      />
    );
  }

  return (
    <ApolloProvider client={clientS}>
      <ThemeProvider theme={colorScheme === "light" ? lightTheme : darkTheme}>
        <MainNavigation />
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
