declare module "typeApi" {
  interface Shop {
    id: string;
    name: string;
    user: {
      id: string;
      username: string;
    };
    photos: {
      id: string;
      url: string;
    }[];
    categories: {
      id: string;
      slug: string;
    }[];
  }
  interface SeeCoffeeShops {
    result: boolean;
    error?: string;
    totalPage?: number;
    shops?: Shop[];
  }
}
