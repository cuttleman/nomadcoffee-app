import React from "react";
import { useMutation } from "@apollo/client";
import styled from "styled-components/native";
import { useForm } from "react-hook-form";
import { FormValues, Scrns } from "types";
import { login } from "../../apollo";
import AuthBtn from "../../components/AuthBtn";
import InputControl from "../../components/InputControl";
import { LOG_IN } from "../../queries";
import constants from "../../constants";

export const Form = styled.View`
  width: ${constants.width / 2}px;
  align-items: center;
  justify-content: center;
`;

export const ErrorMsg = styled.Text`
  margin: 5px 0;
`;

const LogIn: React.FC<Scrns.Auth> = ({ togglePage }) => {
  const {
    control,
    handleSubmit,
    getValues,
    setError,
    formState: { errors, isValid },
  } = useForm<FormValues.LogIn>({ mode: "onChange" });

  const onCompleted = (data: any) => {
    const {
      logIn: { result, token, error },
    } = data;
    if (!result) {
      setError("result", { message: error });
      togglePage();
    } else {
      login(token);
    }
  };

  const [logInMutation, { loading }] = useMutation(LOG_IN, { onCompleted });

  const onSubmit = () => {
    if (loading) {
      return;
    }
    const { email, password } = getValues();
    logInMutation({ variables: { email, password } });
  };
  return (
    <Form>
      <InputControl
        control={control}
        name="email"
        rules={{
          required: true,
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "please input as email type",
          },
        }}
      />
      {errors.email ? (
        <ErrorMsg>{errors.email?.message}</ErrorMsg>
      ) : (
        <ErrorMsg>{""}</ErrorMsg>
      )}
      <InputControl
        control={control}
        name="password"
        rules={{
          required: true,
          pattern: {
            value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
            message: "required that is included 0-9, a-z, !@#$%^&*",
          },
        }}
      />
      {errors.password ? (
        <ErrorMsg>{errors.password?.message}</ErrorMsg>
      ) : (
        <ErrorMsg>{""}</ErrorMsg>
      )}
      <AuthBtn
        text="Log In"
        onPress={handleSubmit(onSubmit)}
        hasError={!isValid}
      />
    </Form>
  );
};

export default LogIn;
