import {
  ApolloClient,
  makeVar,
  InMemoryCache,
  ApolloLink,
  concat,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createUploadLink } from "apollo-upload-client";

export const isLoggedInVar = makeVar(false);
export const isDarkModeVar = makeVar(false);

export const cache = new InMemoryCache();

const uploadLink = createUploadLink({
  uri: "http://172.30.1.53:4000/graphql",
});

const authLink: ApolloLink = setContext(async () => {
  const token = await AsyncStorage.getItem("token");
  return { headers: { token } };
});

const client = new ApolloClient({
  cache,
  link: concat(authLink, uploadLink),
});

export const login = async (token: string) => {
  if (token) {
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("isLoggedIn", "true");
    isLoggedInVar(true);
  }
};

export const logout = async () => {
  await AsyncStorage.clear();
  isLoggedInVar(false);
};

export default client;
