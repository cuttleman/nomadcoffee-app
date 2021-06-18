import React, { useState } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";
import constants from "../constants";
import LogIn from "./partials/LogIn";
import SignUp from "./partials/SignUp";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const TogglePageTrigger = styled.TouchableOpacity`
  background-color: transparent;
`;

const Txt = styled.Text`
  color: ${(props) => props.theme.mainColor};
`;

const Auth = () => {
  const [isSignUpPage, setIsSignUpPage] = useState<boolean>(false);

  const togglePage = () => {
    setIsSignUpPage((prev) => !prev);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        {isSignUpPage ? (
          <SignUp togglePage={togglePage} />
        ) : (
          <LogIn togglePage={togglePage} />
        )}
        <TogglePageTrigger onPress={togglePage}>
          <Txt>{isSignUpPage ? "LOG IN" : "SIGN UP"}</Txt>
        </TogglePageTrigger>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default Auth;
