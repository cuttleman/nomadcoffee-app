import React from "react";
import { useMutation } from "@apollo/client";
import styled from "styled-components/native";
import { useForm } from "react-hook-form";
import { Scrns } from "types";
import { login } from "../../apollo";
import AuthBtn from "../../components/AuthBtn";
import AuthInput from "../../components/AuthInput";
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
  } = useForm({ mode: "onChange" });

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
      <AuthInput control={control} name="email" />
      {errors.email ? (
        <ErrorMsg>{errors.email?.message}</ErrorMsg>
      ) : (
        <ErrorMsg>{""}</ErrorMsg>
      )}
      <AuthInput control={control} name="password" />
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
