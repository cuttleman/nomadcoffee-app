declare module "types" {
  import { Shop } from "typeApi";
  import { GestureResponderEvent } from "react-native";
  import { Control, FieldValues } from "react-hook-form";
  namespace GlobalVar {}
  namespace Scrns {
    interface Auth {
      togglePage: () => void;
    }
  }
  namespace Cpts {
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
