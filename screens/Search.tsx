import { useLazyQuery } from "@apollo/client";
import React, { useState } from "react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { Scrns } from "types";
import HideKeyboard from "../components/HideKeyboard";
import MessageContent from "../components/MessageContent";
import constants from "../constants";
import { SEARCH_COFFEE_SHOP } from "../queries";
import { serverUrl } from "../utils";

const Search = ({ navigation }: Scrns.Search) => {
  const { control, getValues, handleSubmit } = useForm<{ keyword: string }>();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [startQueryFuc, { loading, data, called, refetch }] =
    useLazyQuery(SEARCH_COFFEE_SHOP);

  const NUM_COLUMNS = 3;

  const onValid = () => {
    const { keyword } = getValues();
    startQueryFuc({ variables: { keyword } });
  };

  const onRefresh = async () => {
    try {
      if (refetch) {
        setRefreshing(true);
        refetch();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };

  const searchedItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity>
        <Image
          source={{
            uri: item.photos[0].url.replace(
              "http://localhost:4000/",
              serverUrl("dev").split("graphql")[0]
            ),
          }}
          style={{
            width: constants.width / NUM_COLUMNS,
            height: constants.width / NUM_COLUMNS,
          }}
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
  };

  const searchingBox = () => (
    <Controller
      control={control}
      rules={{
        required: true,
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          onBlur={onBlur}
          onChangeText={onChange}
          placeholder={"title or #category"}
          value={value}
          onSubmitEditing={handleSubmit(onValid)}
        />
      )}
      name="keyword"
      defaultValue=""
    />
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: searchingBox,
    });
  }, [navigation]);

  return (
    <HideKeyboard>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        {!called && <MessageContent text="search by keyword" />}
        {loading && (
          <MessageContent text="searching...">
            <ActivityIndicator />
          </MessageContent>
        )}

        {data?.searchCoffeeShop?.result ? (
          data?.searchCoffeeShop?.shops.length === 0 ? (
            <MessageContent text="Could not found it" />
          ) : (
            <FlatList
              data={data?.searchCoffeeShop?.shops}
              renderItem={searchedItem}
              keyExtractor={(item) => item.id}
              numColumns={NUM_COLUMNS}
              refreshing={refreshing}
              onRefresh={onRefresh}
              columnWrapperStyle={{
                backgroundColor: "white",
                width: constants.width,
                justifyContent: "flex-start",
              }}
            />
          )
        ) : null}
      </View>
    </HideKeyboard>
  );
};

export default Search;
