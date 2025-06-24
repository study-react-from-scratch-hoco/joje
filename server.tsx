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

app.get('/*', (req, res) => {
  try {
    const reactApp = render(req.url);
    const styles = sheet.getStyleTags();
    const response = templateHTML
      .replace('<div id="root"></div>', `<div id="root">${reactApp}</div>`)
      .replace('</head>', `${styles}</head>`);

    sheet.seal();
    return res.send(response);
  } catch (error) {
    console.error('Error during rendering:', error);
    return res.status(500).send('Internal Server Error');
  }
});

app.listen(3000, () => {
  console.log('서버가 실행 중입니다');
}); 