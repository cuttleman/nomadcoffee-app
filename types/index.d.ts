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
    interface CoffeeShopProps extends Shop {
      isCurrent: boolean;
    }
    interface AuthInputProps {
      control: Control<FieldValues>;
      name: string;
      defaultValue?: string;
    }
    interface AuthBtnProps {
      text: string;
      hasError: boolean;
      onPress: (event: GestureResponderEvent) => void;
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

  namespace ParamList {
    type UploadForm = RouteProp<
      { UploadForm: { photos: MediaLibrary.Asset[] } },
      "UploadForm"
    >;
  }
}
