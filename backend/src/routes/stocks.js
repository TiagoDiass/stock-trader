const express = require('express');
const routes = express.Router();
const stocksController = require('../controllers/stocksController');

routes.get('/', stocksController.getAllData);

routes.get('/stocks', stocksController.getStocks);

routes.get('/portfolio', stocksController.getStocksPortfolio);

routes.post('/buy', stocksController.buyStock);

routes.post('/sell', stocksController.sellStock);

routes.get('/restart', stocksController.restartApp);

routes.get('/endday', stocksController.endDay);

module.exports = routes;
