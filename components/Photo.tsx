import { Ionicons } from "@expo/vector-icons";
import React from "react";
import styled from "styled-components/native";
import { Cpts } from "types";
import constants from "../constants";

const BtnContainer = styled.TouchableOpacity<{ index: number }>`
  background-color: white;
  border-color: white;
  border-top-width: 1px;
  border-right-width: ${(props) => (props.index % 3 === 1 ? 1 : 0)}px;
  border-left-width: ${(props) => (props.index % 3 === 1 ? 1 : 0)}px;
  position: relative;
`;

const Image = styled.Image`
  width: ${constants.width / 3 - 2 / 3}px;
  height: ${constants.width / 3 - 2 / 3}px;
`;

const Indicator = styled.View`
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: ${constants.width / 20}px;
  height: ${constants.width / 20}px;
  border-radius: 10px;
  background-color: #2e86de;
  justify-content: center;
  align-items: center;
`;

const IndicatorTxt = styled.Text`
  color: white;
`;

const Photo: React.FC<Cpts.PhotoProps> = ({
  uri,
  index,
  isSelected,
  selectedIndex,
  isSingleMode,
  longPressHandler,
  shortPressHandler,
}) => {
  return (
    <BtnContainer
      index={index}
      onLongPress={longPressHandler.bind(this, index)}
      onPress={shortPressHandler.bind(this, index)}
    >
      <Image source={{ uri }} />
      {isSelected && (
        <Indicator>
          <IndicatorTxt>
            {isSingleMode ? (
              <Ionicons name={"checkmark"} size={16} />
            ) : (
              selectedIndex + 1
            )}
          </IndicatorTxt>
        </Indicator>
      )}
    </BtnContainer>
  );
};

export default Photo;
