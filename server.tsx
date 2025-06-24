import express from 'express';
import path from 'path';
import React from 'react';
import render, { sheet } from './src/index.server';
import { readFileSync } from 'fs';

const app = express();
const templateFile = path.resolve(__dirname, 'index.html');
const templateHTML = readFileSync(templateFile, 'utf-8');

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'dist')));
// 1. 클라이언트가 요청을 보내면
app.get('/*', (req, res) => {
  try {
    // 2. React 컴포넌트를 HTML 문자열로 변환
    const reactApp = render(req.url);
    // 3. styled-components의 스타일을 추출
    const styles = sheet.getStyleTags();
    // 4. HTML 템플릿에 렌더링된 컴포넌트와 스타일을 삽입
    const response = templateHTML
      .replace('<div id="root"></div>', `<div id="root">${reactApp}</div>`)
      .replace('</head>', `${styles}</head>`);

    sheet.seal();
     // 5. 완성된 HTML을 클라이언트로 전송
    return res.send(response);
  } catch (error) {
    console.error('Error during rendering:', error);
    return res.status(500).send('Internal Server Error');
  }
});

app.listen(3000, () => {
  console.log('서버가 실행 중입니다');
}); 