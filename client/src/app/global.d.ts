declare module '*.scss' {
  type IClassNames = Record<string, string>;
  const classNames: IClassNames;
  export = classNames;
}

type OptionalRecord<K extends keyof any, T> = {
  [P in K]?: T;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
declare const _IS_DEV_: boolean;
// eslint-disable-next-line @typescript-eslint/naming-convention
declare const _API_: string;
