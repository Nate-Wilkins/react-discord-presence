import { DefinePlugin, NoEmitOnErrorsPlugin } from 'webpack';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import path from 'path';

// NODE_ENV: 'development' | 'production'
const NODE_ENV =
  process.env.NODE_ENV !== 'production' ? 'development' : 'production';

export default {
  target: 'web',

  entry: {
    index: './src/index.tsx',
    iframe: './src/iframe.tsx',
  },

  output: {
    pathinfo: true,
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js',
    libraryTarget: 'commonjs',
  },

  plugins: [
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
    }),
    new DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV),
    }),
    new NoEmitOnErrorsPlugin(),
  ],

  cache:
    NODE_ENV === 'development'
      ? {
          type: 'filesystem',
          allowCollectingMemory: true,
        }
      : undefined,

  optimization: {
    minimize: true,
    concatenateModules: true,
    removeAvailableModules: false,
    removeEmptyChunks: false,
    moduleIds: 'named',
  },

  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        include: [path.join(__dirname, 'src'), path.join(__dirname, 'test')],
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              // Include type definition files.
              transpileOnly: false,
              allowTsInNodeModules: true,
            },
          },
        ],
      },
      // TODO: Support inlined styles...
      // {
      //   test: /\.css$/,
      //   use: [
      //     { loader: 'style-loader' },
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         esModule: false,
      //         sourceMap: NODE_ENV !== 'production',
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.(css|jpg|jpe?g|png|gif|mp3|svg|gltf|fbx|txt|pdf|md|xml|webp|ttf)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              emitFile: true,
              name() {
                return '[path][name].[ext]';
              },
            },
          },
        ],
      },
      {
        enforce: 'pre',
        test: /\.(js|ts|tsx)$/,
        loader: 'source-map-loader',
      },
    ],
  },

  mode: NODE_ENV,
  devtool: NODE_ENV === 'development' ? 'inline-source-map' : 'source-map',

  node: {
    __filename: true,
    __dirname: false,
  },

  resolve: {
    modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.json'],
    fallback: {
      path: require.resolve('path-browserify'),
    },
    alias: {
      react: path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
    },
  },

  // Don't bundle `react` or `react-dom`.
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React',
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'ReactDOM',
      root: 'ReactDOM',
    },
  },
};
