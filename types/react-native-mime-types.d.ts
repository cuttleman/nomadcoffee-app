declare module "react-native-mime-types" {
  export function charset(type: string): boolean | string;
  export declare var charsets: {
    lookup: (type: string) => boolean | string;
  };
  export function contentType(str: string): boolean | string;
  export function extension(type: string): boolean | string;
  export declare var extensions: any;
  export function lookup(path: string): string;
  export declare var types: any;
}
