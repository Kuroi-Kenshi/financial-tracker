declare module '*.scss' {
  type IClassNames = Record<string, string>;
  const classNames: IClassNames;
  export = classNames;
}

type OptionalRecord<K extends keyof any, T> = {
  [P in K]?: T;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __IS_DEV__: boolean;
// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __API__: string;
