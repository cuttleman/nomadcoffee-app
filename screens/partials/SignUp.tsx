import React from "react";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { Scrns } from "types";
import AuthBtn from "../../components/AuthBtn";
import AuthInput from "../../components/AuthInput";
import { CREATE_ACCOUNT } from "../../queries";
import { ErrorMsg, Form } from "./LogIn";

const SignUp: React.FC<Scrns.Auth> = ({ togglePage }) => {
  const {
    control,
    handleSubmit,
    getValues,
    setError,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

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
      <AuthInput control={control} name="username" />
      {errors.username ? (
        <ErrorMsg>{errors.username?.message}</ErrorMsg>
      ) : (
        <ErrorMsg>{""}</ErrorMsg>
      )}
      <AuthInput control={control} name="name" />
      {errors.name ? (
        <ErrorMsg>{errors.name?.message}</ErrorMsg>
      ) : (
        <ErrorMsg>{""}</ErrorMsg>
      )}
      <AuthInput control={control} name="location" />
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
