import React, { useEffect, useState, useRef } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import Slider from "@react-native-community/slider";
import { NextBtn, NextTxt } from "./Select";
import constants from "../constants";

const Container = styled.View`
  flex: 1;
`;

const ActionsArea = styled.View`
  flex: 0.3;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const TakenBtn = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  background-color: white;
  border: 2px solid rgba(0, 0, 0, 0.5);
  border-radius: 50px;
  elevation: 5;
`;

const OptionBtnArea = styled.View`
  top: 10px;
  left: 10px;
  position: absolute;
  flex-direction: row;
  align-items: center;
`;

const SwitchBtn = styled.TouchableOpacity`
  padding: 5px;
`;

const SliderS = styled(Slider)`
  position: absolute;
  top: 10px;
  right: 10px;
  width: ${constants.width / 3}px;
  height: 40px;
`;

const Take: React.FC = () => {
  const navigation = useNavigation();
  const cameraRef = useRef<Camera>(new Camera({}));
  const [isGranted, setIsGranted] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [takenPhoto, setTakenPhoto] = useState<
    { uri: string; filename: string }[]
  >([]);
  const [type, setType] = useState<0 | 1>(0); // back = 0, front = 1
  const [flashMode, setFlashMode] = useState<"on" | "off">("off");
  const [zoomValue, setZoomValue] = useState<number>(0);

  const getPermission = async () => {
    const { granted: getGranted, canAskAgain } =
      await Camera.getPermissionsAsync();
    if (!getGranted && canAskAgain) {
      const { granted } = await Camera.requestPermissionsAsync();
      if (granted) {
        setIsGranted(true);
      }
    } else {
      setIsGranted(true);
    }
  };

  const onNextPress = () => {
    if (takenPhoto.length === 0) {
      alert("taken a photo needed");
      return;
    }
    navigation.navigate({
      name: "uploadForm",
      params: { photos: takenPhoto },
    });
  };

  const onTypeSwitch = () => {
    setType((prev) => (prev === 0 ? 1 : 0));
  };

  const onFlashSwitch = () => {
    setFlashMode((prev) => (prev === "off" ? "on" : "off"));
  };

  const onTakeHandle = async () => {
    if (isReady) {
      if (cameraRef) {
        const { uri } = await cameraRef.current.takePictureAsync();
        setTakenPhoto([{ uri, filename: "taken.jpg" }]);
      }
    }
  };

  const onSlideValueChange = (value: number) => {
    setZoomValue(value);
  };

  useEffect(() => {
    if (!isGranted) getPermission();
  });

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <NextBtn onPress={onNextPress}>
          <NextTxt>Next</NextTxt>
        </NextBtn>
      ),
    });
  }, [takenPhoto]);

  return isGranted ? (
    <Container>
      <Camera
        ref={cameraRef}
        style={{ flex: 1 }}
        type={type}
        flashMode={flashMode}
        zoom={zoomValue}
        onCameraReady={setIsReady.bind(this, true)}
      ></Camera>
      <ActionsArea>
        <SliderS
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="rgba(0,0,0,0.7)"
          maximumTrackTintColor="rgba(0,0,0,0.5)"
          thumbTintColor="rgb(0,0,0)"
          onValueChange={onSlideValueChange}
        />
        <OptionBtnArea>
          <SwitchBtn onPress={onTypeSwitch}>
            <Ionicons name={"camera-reverse"} size={30} />
          </SwitchBtn>
          <SwitchBtn onPress={onFlashSwitch}>
            <Ionicons
              name={flashMode === "on" ? "flash" : "flash-off"}
              size={30}
            />
          </SwitchBtn>
        </OptionBtnArea>
        <TakenBtn onPress={onTakeHandle} />
      </ActionsArea>
    </Container>
  ) : (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>No access Camera</Text>
    </View>
  );
};

export default Take;
