import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as MediaLibrary from "expo-media-library";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { ParamList } from "types";

const MainContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const UploadForm: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<ParamList.UploadForm>();
  const [photos, setPhotos] = useState<MediaLibrary.Asset[]>([]);

  useEffect(() => {
    setPhotos(route.params.photos);
  }, [route.params]);

  useEffect(() => {
    navigation.setOptions({
      headerBackImage: () => <Ionicons name="chevron-back" size={30} />,
    });
  }, []);

  return (
    <MainContainer>
      <Text>Upload Form screen</Text>
      {/* Form here */}
    </MainContainer>
  );
};

export default UploadForm;
