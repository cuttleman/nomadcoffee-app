import React from "react";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { FormValues, Scrns } from "types";
import AuthBtn from "../../components/AuthBtn";
import InputControl from "../../components/InputControl";
import { CREATE_ACCOUNT } from "../../queries";
import { ErrorMsg, Form } from "./LogIn";

const SignUp: React.FC<Scrns.Auth> = ({ togglePage }) => {
  const {
    control,
    handleSubmit,
    getValues,
    setError,
    formState: { errors, isValid },
  } = useForm<FormValues.SignUp>({ mode: "onChange" });

  const onCompleted = (data: any) => {
    const {
      createAccount: { result, error },
    } = data;
    if (!result) {
      setError("result", { message: error });
    } else {
      togglePage();
    }
  };

  const [signUpMutation, { loading }] = useMutation(CREATE_ACCOUNT, {
    onCompleted,
  });

  const onSubmit = () => {
    if (loading) {
      return;
    }
    const { email, password, username, name, location } = getValues();
    signUpMutation({
      variables: { email, password, username, name, location },
    });
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
      <InputControl
        control={control}
        name="username"
        rules={{
          required: true,
          pattern: {
            value:
              /^([^\s!?@#$%^&*._\-~,;:"'+=()<>[\]ㄱ-ㅎ가-힣]|([a-zA-Z0-9][._]+))*[^\s!?@#$%^&*._\-~,;:"'+=()<>[\]ㄱ-ㅎ가-힣]$/,
            message: "only alphabet and can include . _ middle of characters",
          },
        }}
      />
      {errors.username ? (
        <ErrorMsg>{errors.username?.message}</ErrorMsg>
      ) : (
        <ErrorMsg>{""}</ErrorMsg>
      )}
      <InputControl control={control} name="name" />
      {errors.name ? (
        <ErrorMsg>{errors.name?.message}</ErrorMsg>
      ) : (
        <ErrorMsg>{""}</ErrorMsg>
      )}
      <InputControl control={control} name="location" />
      {errors.location ? (
        <ErrorMsg>{errors.location?.message}</ErrorMsg>
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

export default SignUp;
