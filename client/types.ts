export type BuildMode = 'production' | 'development';

export interface BuildEnv {
  mode: BuildMode;
  port: number;
  apiUrl: string;
}

export interface BuildPaths {
  entry: string;
  output: string;
  html: string;
  src: string;
}
