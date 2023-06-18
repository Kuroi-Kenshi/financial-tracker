import path from 'path';
import {
  type Configuration as WebpackConfiguration,
  ProgressPlugin,
  HotModuleReplacementPlugin,
  DefinePlugin,
} from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
// без этого импорта не работают типы для devServer
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import { type BuildEnv, type BuildPaths } from './types';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export type BuildMode = 'production' | 'development';

function getApiUrl(mode: BuildMode, apiUrl?: string) {
  if (apiUrl) {
    return apiUrl;
  }
  if (mode === 'production') {
    return '/api';
  }

  return 'http://localhost:8000';
}

const paths: BuildPaths = {
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  output: path.resolve(__dirname, 'build'),
  html: path.resolve(__dirname, 'public', 'index.html'),
  src: path.resolve(__dirname, 'src'),
};

export default (env: BuildEnv): WebpackConfiguration => {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  const mode = env.mode || 'development';
  const isDev = mode === 'development';
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  const PORT = env.port || 3000;
  const apiUrl = getApiUrl(mode, env?.apiUrl);

  const config: WebpackConfiguration = {
    mode,
    entry: paths.entry,
    output: {
      filename: '[name].[contenthash].js',
      path: paths.output,
      clean: true,
      publicPath: '/',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: paths.html,
      }),
      new ProgressPlugin(),
      new HotModuleReplacementPlugin(),
      new DefinePlugin({
        __IS_DEV__: JSON.stringify(isDev),
        __API__: JSON.stringify(apiUrl),
      }),
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: {
                  auto: (resPath: string) => Boolean(resPath.includes('.module.')),
                  localIdentName: isDev
                    ? '[path][name]__[local]--[hash:base64:5]'
                    : '[hash:base64:8]',
                },
              },
            },
            'sass-loader',
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      preferAbsolute: true,
      modules: [paths.src, 'node_modules'],
      mainFiles: ['index'],
      alias: {
        '@': paths.src,
      },
    },
    // для прода тоже нужны source-maps?
    devtool: isDev ? 'eval-cheap-module-source-map' : undefined,
    devServer: isDev
      ? {
          port: PORT,
          open: true,
          historyApiFallback: true,
          hot: true,
        }
      : undefined,
  };

  if (!isDev) {
    config.plugins?.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css',
      })
    );
  }

  return config;
};
