const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = { //현재는 개발 모드 설정만 있음
  mode: 'development', //개발 모드 설정
  entry: './src/index.js', //entry point(진입점), 앱이 시작되는 모든 파일 추적, 여기서부터 import된 모든 파일을 추적
  output: { //출력 설정. 번들링된 파일을 저장할 위치와 파일 이름 지정
    path: path.resolve(__dirname, 'dist'), //번들링된 파일을 저장할 위치
    filename: 'bundle.js', //번들링된 파일의 이름
    publicPath: '/', //번들링된 파일을 제공할 경로
  },
  module: {
    rules: [ //webpack이 파일을 처리하는 방법을 정의하는 규칙들의 집함.
      {
        test: /\.(js|jsx|ts|tsx)$/, //졍규표현식을 사용하여 어떤 파일들을 처리할지 지정 : 일반js, react jsx, typescript, typescript react
        exclude: /node_modules/, //처리하지 않을 파일, 디렉토리를 지정 : node_modules 폴더는 제외(이미 빌드된 파일이므로)
        use: {//실제로 파일을 어떻게 변환할지 정의
          loader: 'babel-loader', //babel-loader를 사용하여 파일을 변환
          options: { //로더에 전달할 설정
            presets: ['@babel/preset-env', '@babel/preset-react'] //babel-loader에 전달할 설정
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'] //확장자 설정
  },
  plugins: [
    new HtmlWebpackPlugin({ //HTML 템플릿 플러그인 사용. 번들링 프로세스에 추가된 추가기능 제공.
      template: './index.html' //HTML 템플릿 설정
    })
  ],
  devServer: { //개발 서버 설정. 브라우저에서 실행되는 개발 서버 설정   
    historyApiFallback: true, //브라우저 라우팅 오류 처리
    port: 3000, //포트 3000번
    hot: true //Hot Module Replacement 활성화
  }
}; 