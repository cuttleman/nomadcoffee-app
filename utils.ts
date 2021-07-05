import { ReactNativeFile } from "apollo-upload-client";
import * as mime from "react-native-mime-types";

export const serverUrl = (mode: "dev" | "prod") => {
  if (mode === "dev") {
    return "http://172.30.1.49:4000/graphql";
  } else {
    return "https://coffee-server-nomad.herokuapp.com/graphql";
  }
};

export const generateRNFile = (uri: string, name: string) => {
  return uri
    ? new ReactNativeFile({
        uri,
        type: mime.lookup(uri) || "image",
        name,
      })
    : null;
};
