import express from 'express';
import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './src/app';
import { readFileSync } from 'fs';
import path from 'path';

const app = express();
const templateHTML = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>React SSR</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`;

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'dist')));

// 1. 클라이언트가 요청을 보내면
app.get('/*', (req, res) => {
  res.socket?.on('error', error => {
    console.error('Fatal', error);
  });
  
  let didError = false;

  const stream = renderToPipeableStream(
    <React.StrictMode>
      <StaticRouter location={req.url}>
        <App />
      </StaticRouter>
    </React.StrictMode>,
    {
      bootstrapScripts: ['/client.js'],
      onShellReady() {
        res.statusCode = didError ? 500 : 200;
        res.setHeader('Content-type', 'text/html');
        res.write('<!DOCTYPE html><html><head><title>React SSR</title>');
        res.write('</head><body><div id="root">');
        stream.pipe(res);
        res.write('</div><script src="/client.js"></script></body></html>');
      },
      onShellError(error: Error) {
        didError = true;
        console.error('Shell Error:', error);
        res.statusCode = 500;
        res.send('<!doctype html><h1>Error</h1><pre>' + error.stack + '</pre>');
      },
      onError(error: Error) {
        didError = true;
        console.error('Error:', error);
      },
    }
  );
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
}); 