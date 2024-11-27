const http = require('node:http');
const createCheckout = require("./functions/create-checkout")
const hostname = '127.0.0.1';
const port = 3000;

var orderId = 700;
var ticketId = 22222222222;
var currentOrder = {};
var freeTickets = 3;

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
            currentOrder = JSON.parse(body);
            currentOrder.id = orderId.toString();
            orderId = orderId + 1;
            response.end(JSON.stringify({ id: orderId.toString() }));

          } else if (request.url === '/confirm-order') {
            const tickets = [];
            currentOrder.ticketsInfo.forEach(ticketInfo => {
              for (let i = 0; i < ticketInfo.numberOfTickets; i++) {
                if (ticketInfo.id == 'GR')
                  freeTickets = freeTickets - 1;
                ticketId = ticketId + 1;
                tickets.push({ id: (ticketId).toString(), description: ticketInfo.id, price: ticketInfo.price });
              }
            });
            currentOrder.tickets = tickets;
            currentOrder.code = "42";
            response.end(JSON.stringify({ id: orderId.toString() }));

          } else if (request.url === '/get-order-info') {
            response.end(JSON.stringify(currentOrder));

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
                response.end(JSON.stringify({ message: err.message }));
              });;

          } else if (request.url === '/save-invoice-info') {
            response.end(JSON.stringify({ id: currentOrder.id }));
          } else if (request.url === '/get-free-tickets-available') {
            response.end(JSON.stringify({ amount: freeTickets }));
          }
          else response.end(request.url);
        });
    } else {
      response.statusCode = 200;
      response.end("server running");
    }
  })
  .listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
