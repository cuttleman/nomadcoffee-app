import React from "react";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../apollo";
import Profile from "../screens/Profile";
import Auth from "../screens/Auth";

const ProfileNavigation = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return isLoggedIn ? <Profile /> : <Auth />;
};

export default ProfileNavigation;
