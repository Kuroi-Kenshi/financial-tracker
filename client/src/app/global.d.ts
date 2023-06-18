declare module '*.scss' {
  interface IClassNames {
    [className: string]: string;
  }
  const classNames: IClassNames;
  export = classNames;
}

// declare module '*.scss' {
//   const content: Record<string, string>;
//   export default content;
// }

declare const __IS_DEV__: boolean;
declare const __API__: string;
