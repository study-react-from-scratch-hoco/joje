import * as React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { ServerStyleSheet } from 'styled-components';
import App from './app';
import { fetchUserWithPosts } from './api';

export const sheet = new ServerStyleSheet();

export default async function render(url: string) {
  try {
    // 서버에서 중첩된 데이터를 미리 가져옴
    const userWithPosts = await fetchUserWithPosts(1);  // userId 1을 가진 사용자의 데이터
    
    // 전역 객체에 초기 데이터를 설정
    const initialData = {
      userWithPosts
    };

    // 4. 렌더링된 컴포넌트를 문자열로 변환
    const app = ReactDOMServer.renderToString(
      sheet.collectStyles(
        <React.StrictMode>
          <StaticRouter location={url}>
            <App />
          </StaticRouter>
        </React.StrictMode>
      )
    );

    // 5. 초기 데이터를 스크립트 태그로 전달 : 데이터를 전역 객체에 넣을 스크립트 생성
    const dataScript = `<script>window.__INITIAL_DATA__ = ${JSON.stringify(initialData)}</script>`;

    return { app, dataScript };
  } catch (error) {
    console.error('Rendering error:', error);
    throw error;
  }
} 