export const serverUrl = (mode: "dev" | "prod") => {
  if (mode === "dev") {
    return "http://192.168.208.166:4000/graphql";
  } else {
    return "https://coffee-server-nomad.herokuapp.com/graphql";
  }
};
