import React, { useState } from "react";
import { FlatList, NativeScrollEvent } from "react-native";
import { useQuery } from "@apollo/client";
import CoffeeShop from "../components/CoffeeShop";
import { SEE_COFFEE_SHOPS } from "../queries";
import { SeeCoffeeShops, Shop } from "typeApi";
import { useEffect } from "react";
import Loader from "../components/Loader";
import constants from "../constants";

const Home = () => {
  const [pageNum, setPageNum] = useState<number>(1);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [shops, setShops] = useState<Shop[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const { data, loading, refetch } = useQuery<{
    seeCoffeeShops: SeeCoffeeShops;
  }>(SEE_COFFEE_SHOPS, {
    variables: { pageNum: pageNum },
    fetchPolicy: "network-only",
  });

  const onRefresh = () => {
    try {
      setRefreshing(true);
      refetch();
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };

  const setCurrentIndex = ({
    nativeEvent,
  }: {
    nativeEvent: NativeScrollEvent;
  }) => {
    const checkVelo = nativeEvent.velocity ?? { x: 0 };
    const offset = Math.floor(nativeEvent.contentOffset.x);
    const velocity = Math.floor(checkVelo.x);
    const screen = Math.floor(constants.width);
    // console.log(`current: ${offset % screen}, velocity: ${velocity}`);
    if (offset === 0) {
      setCurrent(0);
    }
    if (velocity >= 0) {
      if (
        offset % screen >= screen / 2 - 20 &&
        offset % screen >= screen / 2 + 30
      ) {
        const index = Math.floor(offset / screen) + 1;
        setCurrent(index);
      }
    } else if (velocity < 0) {
      if (offset % screen >= 0 && offset % screen >= 30) {
        const index = Math.floor(offset / screen);
        setCurrent(index);
      }
    }
  };

  const onReachedBottom = () => {
    const hasNext = data?.seeCoffeeShops.hasNext;
    if (hasNext) {
      setPageNum((prev) => prev + 1);
    } else {
      setCurrent(shops.length - 1);
    }
  };

  useEffect(() => {
    if (data?.seeCoffeeShops.result) {
      const fetchedShops = data?.seeCoffeeShops.shops;
      if (fetchedShops) {
        setShops((prev) => prev.concat(fetchedShops));
      }
    }
  }, [data]);

  return (
    shops && (
      <>
        <FlatList
          contentContainerStyle={{
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
          }}
          data={shops}
          renderItem={({ item, index }: { item: Shop; index: number }) => (
            <CoffeeShop {...item} isCurrent={index === current} />
          )}
          keyExtractor={(item) => item.id}
          refreshing={refreshing}
          onRefresh={onRefresh}
          horizontal
          onEndReached={onReachedBottom}
          onScroll={setCurrentIndex}
          onEndReachedThreshold={0.5}
        />

        {loading && <Loader />}
      </>
    )
  );
};

export default Home;
