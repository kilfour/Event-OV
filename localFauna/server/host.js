const http = require('node:http');

const { FAUNA_KEY } = process.env;
const faunadb = require('faunadb');

const q = faunadb.query
const confirmOrder = require("./functions/confirm-order")
const getOrderInfo = require("./functions/get-order-info")
const orderInfoEntered = require("./functions/order-info-entered")
const createCheckout = require("./functions/create-checkout")
const saveInvoiceInfo = require("./functions/save-invoice-info")
const getFreeTicketsAvailable = require("./functions/get-free-tickets-available")


const hostname = '127.0.0.1';
const port = 3000;

var endpoint = 'https://db.fauna.com/'
var mg, domain, fnPort, scheme

if ((mg = endpoint.match(/^(https?):\/\/([^:]+)(:(\d+))?/))) {
  scheme = mg[1] || 'https'
  domain = mg[2] || 'db.fauna.com'
  fnPort = mg[4] || 443
}

http
  .createServer((request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Credentials", "true");
    response.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    response.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    if (request.method === 'POST') {
      let body = [];
      request
        .on('data', chunk => {
          body.push(chunk);
        })
        .on('end', () => {
          body = Buffer.concat(body).toString();

          if (request.url === '/order-info-entered') {
            orderInfoEntered
              .handler({ body: body })
              .then((ret) => { response.end(ret.body); });

          } else if (request.url === '/confirm-order') {
            confirmOrder
              .handler({ body: body })
              .then((ret) => { response.end(ret.body); });

          } else if (request.url === '/get-order-info') {
            getOrderInfo
              .handler({ body: body })
              .then((ret) => response.end(ret.body));

          } else if (request.url === '/create-checkout') {
            createCheckout.handler({ body: body })
              .then(data => {
                response.end(JSON.stringify(data));
              }).catch((err) => {
                console.error(
                  'Error: [%s] %s %s',
                  err.name,
                  err.message,
                  err.description
                );
                return {
                  statusCode: 200,
                  body: JSON.stringify({ message: err.message })
                }
              });;

          } else if (request.url === '/save-invoice-info') {
            saveInvoiceInfo
              .handler({ body: body })
              .then((ret) => { response.end(ret.body); });
          } else if (request.url === '/get-free-tickets-available') {
            getFreeTicketsAvailable
              .handler({ body: body })
              .then((ret) => { { response.end(ret.body); } });
          } else response.end(request.url);
        });
    } else {
      response.statusCode = 200;
      response.end("server running");
    }
  })
  .listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
