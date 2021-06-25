import React from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

const HideKeyboard: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    {children}
  </TouchableWithoutFeedback>
);

export default HideKeyboard;
