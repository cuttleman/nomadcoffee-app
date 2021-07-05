import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { useQuery } from "@apollo/client";
import CoffeeShop from "../components/CoffeeShop";
import { SEE_COFFEE_SHOPS } from "../queries";
import Loader from "../components/Loader";
import { SeeCoffeeShops, Shop } from "typeApi";

const Home = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [shops, setShops] = useState<Shop[]>([]);
  const [pageNum, setPageNum] = useState<number>(1);
  const { data, loading, refetch } = useQuery<{
    seeCoffeeShops: SeeCoffeeShops;
  }>(SEE_COFFEE_SHOPS, {
    variables: { pageNum },
    fetchPolicy: "no-cache",
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

  const onReachedBottom = async () => {
    const hasNext = data?.seeCoffeeShops.hasNext;
    if (hasNext) {
      setPageNum((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (data?.seeCoffeeShops.result) {
      if (data?.seeCoffeeShops.shops) {
        setShops((prev) =>
          Array.from(new Set([...prev, ...data?.seeCoffeeShops.shops]))
        );
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
          renderItem={({ item }: { item: Shop }) => <CoffeeShop {...item} />}
          keyExtractor={(item) => item.id}
          refreshing={refreshing}
          onRefresh={onRefresh}
          onEndReached={onReachedBottom}
          onEndReachedThreshold={0.5}
        />

        {loading && <Loader />}
      </>
    )
  );
};

export default Home;
