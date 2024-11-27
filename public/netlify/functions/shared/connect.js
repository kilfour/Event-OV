const { FAUNA_KEY } = process.env;
const faunadb = require('faunadb');
const secret = process.env.FAUNA_KEY

var endpoint = 'https://db.fauna.com/'
var mg, domain, port, scheme
if ((mg = endpoint.match(/^(https?):\/\/([^:]+)(:(\d+))?/))) {
    scheme = mg[1] || 'https'
    domain = mg[2] || 'db.fauna.com'
    port = mg[4] || 443
}

exports.query = function (q, getData) {
    var client = new faunadb.Client({
        secret: secret,
        domain: domain,
        port: port,
        scheme: scheme,
    })
    return client.query(q)
        .then((ret) => {
            return {
                statusCode: 200,
                body: JSON.stringify(getData(ret))
            };
        })
        .catch((err) => {
            console.error(
                'Error: [%s] %s: %s',
                err.name,
                err.message
            );
            return {
                statusCode: 200,
                body: JSON.stringify({ message: err.message })
            }
        });
};