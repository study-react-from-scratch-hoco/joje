import * as React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { ServerStyleSheet } from 'styled-components';
import App from './app';

export const sheet = new ServerStyleSheet();

export default function render(url: string) {
  try {
    return ReactDOMServer.renderToString(
      sheet.collectStyles(
        <React.StrictMode>
          <StaticRouter location={url}>
            <App />
          </StaticRouter>
        </React.StrictMode>
      )
    );
  } catch (error) {
    console.error('Rendering error:', error);
    throw error;
  }
} 