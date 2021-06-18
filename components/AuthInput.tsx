import React from "react";
import styled from "styled-components/native";
import { Controller } from "react-hook-form";
import constants from "../constants";
import { Cpts } from "types";

const SInput = styled.TextInput`
  width: ${constants.width / 2}px;
  padding: 10px;
  border-width: 1px;
  border-radius: 5px;
  border-color: ${(props) => props.theme.mainColor};
  background-color: ${(props) => props.theme.shopCardColor};
`;

const AuthInput: React.FC<Cpts.AuthInputProps> = ({
  control,
  name,
  defaultValue,
}) => {
  return (
    <Controller
      control={control}
      rules={{
        required: name === "location" || name === "name" ? false : true,
        ...((name === "email" && {
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "please input as email type",
          },
        }) ||
          (name === "password" && {
            pattern: {
              value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
              message: "required that is included 0-9, a-z, !@#$%^&*",
            },
          }) ||
          (name === "username" && {
            pattern: {
              value:
                /^([^\s!?@#$%^&*._\-~,;:"'+=()<>[\]ㄱ-ㅎ가-힣]|([a-zA-Z0-9][._]+))*[^\s!?@#$%^&*._\-~,;:"'+=()<>[\]ㄱ-ㅎ가-힣]$/,
              message: "only alphabet and can include . _ middle of characters",
            },
          })),
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <SInput
          placeholder={name}
          onBlur={onBlur}
          onChangeText={(value: string) => onChange(value)}
          value={value}
          secureTextEntry={name === "password" && true}
          autoCorrect={false}
          multiline={false}
        />
      )}
      name={name}
      defaultValue={defaultValue || ""}
    />
  );
};

export default AuthInput;
