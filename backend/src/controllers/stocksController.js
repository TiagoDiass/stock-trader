const fs = require('fs');
const data = require('../../data.json');

function writeData(data) {
  fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
    if (err) {
      return res.send(`[SERVER] Write file error: ${err}`);
    }
  });
}

module.exports = {
  getAllData(request, response) {
    return response.status(200).json(data);
  },

  getStocks(request, response) {
    return response.json(data.stocks);
  },

  getStocksPortfolio(request, response) {
    return response.json(data.stocksPortfolio);
  },

  buyStock(request, response) {
    const { stockId, stockAmount } = request.body;

    const stock = data.stocks.find((element) => element.id == stockId);

    if (!stock) {
      return response.status(400).json({
        status: 400,
        message: 'Ação não encontrada',
      });
    }

    if (stock.price * stockAmount > data.funds) {
      return response.status(400).json({
        status: 400,
        message: 'Saldo insuficiente',
      });
    }

    data.funds -= stock.price * stockAmount;

    let stockIndex;

    data.stocksPortfolio.forEach((stock, index) => {
      if (stock.id == stockId) stockIndex = index;
    });

    if (stockIndex === undefined) {
      data.stocksPortfolio.push({
        id: stock.id,
        name: stock.name,
        price: stock.price,
        amount: stockAmount,
      });
    } else {
      data.stocksPortfolio[stockIndex].amount += stockAmount;
    }

    writeData(data);

    return response.status(200).json({
      status: 200,
      message: 'Ação comprada com sucesso',
    });
  },

  sellStock(request, response) {
    const { stockId, stockAmount } = request.body;

    const stock = data.stocksPortfolio.find((element) => element.id == stockId);

    if (!stock) {
      return response.status(400).json({
        status: 400,
        message: 'Ação não encontrada no seu portfólio',
      });
    }

    if (stockAmount > stock.amount) {
      return response.status(400).json({
        status: 400,
        message: 'Operação inválida, você não pode vender mais ações do que tem',
      });
    }

    data.funds += stockAmount * stock.price;

    let stockIndex;

    data.stocksPortfolio.forEach((stock, index) => {
      if (stock.id == stockId) stockIndex = index;
    });

    data.stocksPortfolio[stockIndex].amount -= stockAmount;

    if (data.stocksPortfolio[stockIndex].amount == 0) {
      data.stocksPortfolio.splice(stockIndex, 1);
    }

    writeData(data);

    return response.status(200).json({
      status: 200,
      message: 'Ação vendida com sucesso',
      dados: {
        funds: data.funds,
        portfolio: data.stocksPortfolio,
      },
    });
  },

  restartApp(request, response) {
    data.funds = 10000;
    data.stocks = [
      {
        id: 1,
        name: 'BMW',
        price: 110,
      },
      {
        id: 2,
        name: 'Google',
        price: 200,
      },
      {
        id: 3,
        name: 'Apple',
        price: 280,
      },
      {
        id: 4,
        name: 'Twitter',
        price: 85,
      },
    ];

    data.stocksPortfolio = [];

    writeData(data);

    return response.status(200).json({
      status: 200,
      message: 'A aplicação foi reinicializada com sucesso',
      dados: data,
    });
  },

  endDay(request, response) {
    data.stocks.forEach((stock) => {
      stock.price = Math.round(stock.price * (1 + Math.random() - 0.42));

      data.stocksPortfolio.forEach((stockInPortfolio) => {
        if (stockInPortfolio.id == stock.id) {
          stockInPortfolio.price = stock.price;
        }
      });
    });

    writeData(data);

    return response.status(200).json({
      status: 200,
      message: 'Dia finalizado com sucesso',
      dados: data.stocks,
    });
  },
};
