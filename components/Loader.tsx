import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import constants from "../constants";

const Container = styled.View`
  position: absolute;
  width: ${constants.width}px;
  height: ${constants.height}px;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Loader: React.FC = () => (
  <Container>
    <ActivityIndicator size={"large"} color="#0000ff" />
  </Container>
);

export default Loader;
