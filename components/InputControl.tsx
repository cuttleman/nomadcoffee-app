import React from "react";
import { Controller } from "react-hook-form";
import styled from "styled-components/native";
import { Cpts } from "types";
import constants from "../constants";

const InputS = styled.TextInput`
  width: ${constants.width / 2}px;
  border-bottom-width: 1px;
  border-color: #b2bec3;
  padding: 5px;
  margin-bottom: 5px;
`;

const InputControl: React.FC<Cpts.InputControlProps> = ({
  control,
  name,
  defaultValue,
  rules,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue || ""}
      rules={rules && { ...rules }}
      render={({ field }) => (
        <InputS
          returnKeyType="go"
          onBlur={field.onBlur}
          onChangeText={field.onChange}
          value={field.value}
          placeholder={name}
          secureTextEntry={name === "password" && true}
          autoCorrect={false}
          multiline={false}
        />
      )}
    />
  );
};

export default InputControl;
