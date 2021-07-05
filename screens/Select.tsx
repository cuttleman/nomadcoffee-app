import React, { useState, useEffect } from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import * as MediaLibrary from "expo-media-library";
import Photo from "../components/Photo";
import { Ionicons } from "@expo/vector-icons";

const MainContainer = styled.View`
  flex: 1;
`;

const SelectedContainer = styled.View`
  flex: 1;
  border-bottom-width: 1px;
  border-color: white;
  position: relative;
`;

const AssetContainer = styled.View`
  flex: 1;
`;

const PhotoPreview = styled.Image`
  flex: 1;
`;

const SelectModeIndicator = styled.View`
  position: absolute;
  bottom: 10px;
  right: 10px;
  padding: 4px;
  background-color: white;
  border-radius: 20px;
  elevation: 6;
`;

export const NextBtn = styled.TouchableOpacity`
  margin-right: 15px;
  padding: 5px;
`;

export const NextTxt = styled.Text`
  color: #00a8ff;
  font-weight: 700;
  font-size: 16px;
`;

const Select: React.FC = () => {
  const navigation = useNavigation();
  const [isGranted, setIsGranted] = useState<boolean>(false);
  const [photos, setPhotos] = useState<MediaLibrary.Asset[]>([]);
  const [selectMode, setSelectMode] = useState<"single" | "multiple">("single");
  const [selectedPhotos, setSelectedPhotos] = useState<MediaLibrary.Asset[]>(
    []
  );

  const selectedIndex = (index: number): number => {
    return selectedPhotos.findIndex(
      (selectedPhoto) => selectedPhoto.id === photos[index].id
    );
  };

  const isSelected = (index: number): boolean => {
    return selectedPhotos.some(
      (selectedPhoto) => selectedPhoto.id === photos[index].id
    );
  };

  const longPressHandle = (photoIndex: number) => {
    if (selectMode === "single") {
      setSelectMode("multiple");
    } else {
      setSelectMode("single");
    }
    setSelectedPhotos([photos[photoIndex]]);
  };

  const shortPressHandle = (photoIndex: number) => {
    if (selectMode === "multiple") {
      const isExist = selectedPhotos.some(
        (selectedPhoto) => selectedPhoto.id === photos[photoIndex].id
      );
      if (isExist) {
        if (selectedPhotos.length > 1) {
          const newSelectedPhotos = selectedPhotos.filter(
            (photo) => photo.id !== photos[photoIndex].id
          );
          setSelectedPhotos(newSelectedPhotos);
        }
      } else {
        setSelectedPhotos((prev) => [...prev, photos[photoIndex]]);
      }
    } else {
      setSelectedPhotos([photos[photoIndex]]);
    }
  };

  const getPhotos = async () => {
    if (isGranted) {
      const { assets } = await MediaLibrary.getAssetsAsync({ first: 20 });
      // console.log(assets.length);
      setPhotos(assets);
      setSelectedPhotos([assets[0]]);
    }
  };

  const getPermission = async () => {
    const { granted: getGranted, canAskAgain } =
      await MediaLibrary.getPermissionsAsync();
    if (!getGranted && canAskAgain) {
      const { granted } = await MediaLibrary.requestPermissionsAsync();
      if (granted) {
        setIsGranted(true);
      }
    } else if (getGranted) {
      setIsGranted(true);
    }
  };

  useEffect(() => {
    if (!isGranted) {
      getPermission();
    }
    getPhotos();
  }, [isGranted]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <NextBtn
          onPress={navigation.navigate.bind(this, {
            name: "uploadForm",
            params: { photos: selectedPhotos },
          })}
        >
          <NextTxt>Next</NextTxt>
        </NextBtn>
      ),
    });
  }, [selectedPhotos]);

  return (
    <MainContainer>
      <SelectedContainer>
        <PhotoPreview
          source={{
            uri:
              selectMode === "single"
                ? selectedPhotos[0]?.uri
                : selectedPhotos[selectedPhotos.length - 1]?.uri,
          }}
          resizeMode="contain"
        />
        <SelectModeIndicator>
          <Ionicons
            name={selectMode === "single" ? "image-outline" : "images-outline"}
            size={25}
            color="#353b48"
          />
        </SelectModeIndicator>
      </SelectedContainer>
      <AssetContainer>
        <FlatList
          data={photos}
          renderItem={({ item, index }) => {
            return (
              <Photo
                uri={item.uri}
                isSingleMode={selectMode === "single"}
                isSelected={isSelected(index)}
                selectedIndex={selectedIndex(index)}
                index={index}
                longPressHandler={longPressHandle}
                shortPressHandler={shortPressHandle}
              />
            );
          }}
          keyExtractor={(item) => item.id}
          numColumns={3}
        />
      </AssetContainer>
    </MainContainer>
  );
};

export default Select;
