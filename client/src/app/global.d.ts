declare module '*.scss' {
  interface IClassNames {
    [className: string]: string;
  }
  const classNames: IClassNames;
  export = classNames;
}

type OptionalRecord<K extends keyof any, T> = {
  [P in K]?: T;
};

declare const __IS_DEV__: boolean;
declare const __API__: string;
