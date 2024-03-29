import express from 'express';

import webpack from 'webpack';
import webpackConfig from '../../webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { RoutingContext, match } from 'react-router';
import { Provider } from 'react-redux';
import createLocation from 'history/lib/createLocation';

import configureStore from '../common/store/configureStore';
import routes from '../common/routes';
import packagejson from '../../package.json';

const app = express();
const renderFullPage = (html, initialState) => {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Find State Tests</title>
        <link rel="stylesheet" type="text/css" href="http://localhost:8080/setup/leaflet/css" />
        <link rel="stylesheet" type="text/css" href="/static/app.css" />
        <link rel="stylesheet" type="text/css" href="http://localhost:8080/setup/bootstrap/css" />
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}; 
        </script>
        <script src="/static/bundle.js"></script>
        <script src="http://localhost:8080/setup/leaflet/js"></script>
        <script src="http://localhost:8080/setup/jquery"></script>
        <script src="http://localhost:8080/setup/bootstrap/js"></script>
      </body>
    </html>
  `;
}

if(process.env.NODE_ENV !== 'production'){
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}else{
  app.use('/static', express.static(__dirname + '/../../dist'));
}

app.get('/*', function (req, res) {

  const location = createLocation(req.url);

 

  match({ routes, location }, (err, redirectLocation, renderProps) => {
    if(err) {
      console.error(err);
      return res.status(500).end('Internal server error');
    }

    if(!renderProps)
      return res.status(404).end('Not found');

    const store = configureStore();

    const InitialView = (
      <Provider store={store}>
          <RoutingContext {...renderProps} />
      </Provider>
    );

    const componentHTML = ReactDOMServer.renderToString(InitialView);
    const initialState = store.getState();
    res.status(200).end(renderFullPage(componentHTML,initialState));  
  });

  
});

const server = app.listen(80, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('CLI ===> 🖥  Client Available at http://localhost:%d/home', port);
});