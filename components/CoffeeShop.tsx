import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import { Cpts } from "types";
import constants from "../constants";
import { serverUrl } from "../utils";

const Container = styled.TouchableOpacity`
  width: ${constants.width}px;
  align-items: center;
  margin-bottom: 30px;
`;

const MainImg = styled.Image`
  width: 100%;
  height: 500px;
  resize-mode: contain;
`;

const ContentBox = styled.View`
  width: ${constants.width / 1.5}px;
  background-color: ${(props) => props.theme.shopCardColor};
  padding: 30px;
  padding-top: 50px;
  align-items: center;
  border-radius: 5px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const CategoriesBox = styled.View`
  margin: 10px 0;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const Category = styled.Text`
  padding: 10px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.mainColor};
  color: ${(props) => props.theme.defaultColor};
  margin: 0 5px;
`;

const CoffeeShop: React.FC<Cpts.CoffeeShopProps> = ({
  id: shopId,
  name,
  user,
  photos,
  categories,
}) => {
  return (
    <Container>
      <MainImg
        source={{
          uri: photos[0].url.replace(
            "http://localhost:4000/",
            serverUrl("dev").split("graphql")[0]
          ),
        }}
        // style={{
        //   resizeMode: "contain",
        //   width: "100%",
        //   height: undefined,
        //   aspectRatio: 1,
        // }}
      />
      <ContentBox>
        <Title>{name}</Title>
        {categories.length > 0 && (
          <CategoriesBox>
            {categories.map((category) => (
              <Category key={category.id}>#{category.slug}</Category>
            ))}
          </CategoriesBox>
        )}
      </ContentBox>
    </Container>
  );
};

export default CoffeeShop;
