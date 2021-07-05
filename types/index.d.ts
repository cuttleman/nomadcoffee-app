declare module "types" {
  import React from "react";
  import { ParamListBase, RouteProp } from "@react-navigation/native";
  import { Shop } from "typeApi";
  import { GestureResponderEvent } from "react-native";
  import { Control, FieldValues } from "react-hook-form";
  import * as MediaLibrary from "expo-media-library";
  namespace GlobalVar {}
  namespace NavProps {
    interface StackParamList extends ParamListBase {
      Home: undefined;
      Search: undefined;
      Profile: undefined;
    }
  }
  namespace Scrns {
    interface Auth {
      togglePage: () => void;
    }
    interface Search {
      navigation: StackNavigationProp<NavProps.StackParamList>;
    }
  }
  namespace Cpts {
    interface MessageContetProps {
      text: string;
      children?: React.ReactNode;
    }
    interface CoffeeShopProps extends Shop {}
    interface AuthBtnProps {
      text: string;
      hasError: boolean;
      onPress: (event: GestureResponderEvent) => void;
    }
    interface InputControlProps {
      control: Control<
        FieldValues<FormValues.Upload | FormValues.LogIn | FormValues.SignUp>
      >;
      name: string;
      defaultValue?: string;
      rules?: {
        required?: boolean;
        maxLength?: {
          value: number;
          message: string;
        };
        minLength?: {
          value: number;
          message: string;
        };
        pattern?: {
          value: RegExp;
          message: string;
        };
      };
    }
    interface PhotoProps {
      uri: string;
      isSelected: boolean;
      index: number;
      selectedIndex: number;
      isSingleMode: boolean;
      longPressHandler: (photoId: number) => void;
      shortPressHandler: (photoId: number) => void;
    }
  }

  namespace FormValues {
    interface LogIn {
      email: string;
      password: string;
      result: string;
    }
    interface SignUp {
      email: string;
      password: string;
      username: string;
      name?: string;
      location?: string;
      result: string;
    }
    interface Upload {
      name: string;
      latitude: string;
      longitude: string;
      result: string;
    }
  }

  namespace ParamList {
    type UploadForm = RouteProp<
      { UploadForm: { photos: MediaLibrary.Asset[] } },
      "UploadForm"
    >;
    type Home = RouteProp<{ Home: { pageNum: number } }, "Home">;
  }
}
