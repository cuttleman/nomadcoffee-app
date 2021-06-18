import React from "react";
import styled from "styled-components/native";
import { Cpts } from "types";
import constants from "../constants";

const Btn = styled.TouchableOpacity`
  padding: 10px 20px;
  border-radius: 5px;
  justify-content: center;
  align-self: flex-end;
  align-items: center;
  margin: 15px 0;
  background-color: ${(props) => props.theme.mainBtnColor};
`;

const Txt = styled.Text`
  color: white;
  font-size: 16px;
  text-transform: uppercase;
`;

const AuthBtn: React.FC<Cpts.AuthBtnProps> = ({ text, onPress, hasError }) => {
  return (
    <Btn onPress={onPress} disabled={hasError}>
      <Txt>{text}</Txt>
    </Btn>
  );
};

export default AuthBtn;
