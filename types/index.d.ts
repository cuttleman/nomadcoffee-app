declare module "types" {
  import React from "react";
  import { ParamListBase } from "@react-navigation/native";
  import { Shop } from "typeApi";
  import { GestureResponderEvent } from "react-native";
  import { Control, FieldValues } from "react-hook-form";
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
  }
}
