import { gql } from "@apollo/client";

export const SEE_PROFILE = gql`
  query seeProfile($id: String, $pageNum: Int!) {
    seeProfile(id: $id) {
      result
      error
      user {
        id
        username
        avatarUrl
        email
      }
      seeFollowers(pageNum: $pageNum) {
        users {
          id
          username
          avatarUrl
        }
        totalPageNum
      }
      seeFollowing(pageNum: $pageNum) {
        users {
          id
          username
          avatarUrl
        }
        totalPageNum
      }
      totalFollowers {
        count
      }
      totalFollowing {
        count
      }
    }
  }
`;

export const LOG_IN = gql`
  mutation logIn($email: String!, $password: String!) {
    logIn(email: $email, password: $password) {
      result
      token
      error
    }
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation createAccount(
    $email: String!
    $username: String!
    $password: String!
    $name: String
    $location: String
  ) {
    createAccount(
      email: $email
      username: $username
      password: $password
      name: $name
      location: $location
    ) {
      result
      error
    }
  }
`;

export const SEE_COFFEE_SHOPS = gql`
  query seeCoffeeShops($pageNum: Int!) {
    seeCoffeeShops(pageNum: $pageNum) {
      result
      error
      hasNext
      shops {
        id
        name
        user {
          id
          username
        }
        photos {
          id
          url
        }
        categories {
          id
          slug
        }
      }
    }
  }
`;

export const SEARCH_COFFEE_SHOP = gql`
  query searchCoffeeShop($keyword: String!) {
    searchCoffeeShop(keyword: $keyword) {
      result
      error
      shops {
        id
        name
        photos {
          id
          url
        }
      }
    }
  }
`;

export const CREATE_COFFEE_SHOP = gql`
  mutation createCoffeeShop(
    $name: String!
    $latitude: String
    $longitude: String
    $categories: [String]
    $photos: [Upload]
  ) {
    createCoffeeShop(
      name: $name
      latitude: $latitude
      longitude: $longitude
      categories: $categories
      photos: $photos
    ) {
      result
      error
    }
  }
`;
