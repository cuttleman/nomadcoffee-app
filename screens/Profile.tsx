import React from "react";
import { useQuery } from "@apollo/client";
import { View, Text, Button } from "react-native";
import { logout } from "../apollo";
import { SEE_PROFILE } from "../queries";

const Profile = () => {
  const { data, loading } = useQuery(SEE_PROFILE, {
    variables: {
      pageNum: 1,
    },
  });
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile</Text>
      <Button title="" onPress={logout}>
        Log out
      </Button>
    </View>
  );
};

export default Profile;
