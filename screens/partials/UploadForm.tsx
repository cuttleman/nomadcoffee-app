import React, { useEffect, useState } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import {
  CommonActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import * as MediaLibrary from "expo-media-library";
import styled from "styled-components/native";
import { useForm } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import constants from "../../constants";
import { NextBtn, NextTxt } from "../Select";
import InputControl from "../../components/InputControl";
import { CREATE_COFFEE_SHOP } from "../../queries";
import { generateRNFile } from "../../utils";
import { FormValues, ParamList } from "types";

const MainContainer = styled.View`
  flex: 1;
  flex-direction: row;
  background-color: white;
  padding: 5px;
`;

const Preview = styled.Image`
  width: ${constants.width / 3}px;
  height: ${constants.width / 3}px;
  margin-right: 10px;
`;

const Form = styled.View``;

const Error = styled.View`
  align-self: center;
  margin-top: 10px;
`;

const ErrorTxt = styled.Text`
  color: tomato;
  font-weight: 700;
`;

const DoneBtn = styled(NextBtn)``;

const DoneTxt = styled(NextTxt)``;

const UploadForm: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<ParamList.UploadForm>();
  const [photos, setPhotos] = useState<MediaLibrary.Asset[]>([]);
  const {
    control,
    getValues,
    setError,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<FormValues.Upload>({ mode: "onChange" });

  const onCompleted = (data: any) => {
    const {
      createCoffeeShop: { result, error },
    } = data;
    if (!result) {
      setError("result", { message: error });
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: "tabs" }],
        })
      );
    }
  };

  const [newShopMutation, { loading }] = useMutation(CREATE_COFFEE_SHOP, {
    onCompleted,
  });

  const doneHandle = () => {
    if (loading) {
      return;
    }
    const { name, latitude, longitude } = getValues();
    const convertPhotos = photos.map((photo) =>
      generateRNFile(photo.uri, photo.filename)
    );
    if (isValid && name !== "") {
      newShopMutation({
        variables: {
          name,
          latitude,
          longitude,
          photos: convertPhotos,
          categories: [],
        },
      });
    }
  };

  useEffect(() => {
    setPhotos(route.params.photos);
  }, [route.params]);

  useEffect(() => {
    navigation.setOptions({
      headerBackImage: () => <Ionicons name="chevron-back" size={30} />,
      headerRight: () => (
        <DoneBtn onPress={handleSubmit(doneHandle)}>
          <DoneTxt>Done</DoneTxt>
        </DoneBtn>
      ),
    });
  }, [isValid]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <MainContainer>
        {photos.length > 0 && <Preview source={{ uri: photos[0].uri }} />}
        <Form>
          <InputControl
            control={control}
            name="name"
            rules={{
              required: true,
              maxLength: {
                value: 15,
                message: "name field: max length 15",
              },
            }}
          />
          <InputControl
            control={control}
            name="latitude"
            rules={{
              pattern: {
                value: /^[-]?[0-9]+(\.?[0-9]+)?$/,
                message: "latitude field: input type number",
              },
            }}
          />
          <InputControl
            control={control}
            name="longitude"
            rules={{
              pattern: {
                value: /^[-]?[0-9]+(\.?[0-9]+)?$/,
                message: "longitude field: input type number",
              },
            }}
          />
          <Error>
            <ErrorTxt>
              {!isValid &&
                (errors.name?.message ||
                  errors.latitude?.message ||
                  errors.longitude?.message)}
            </ErrorTxt>
          </Error>
        </Form>
      </MainContainer>
    </TouchableWithoutFeedback>
  );
};

export default UploadForm;
