const faunadb = require('faunadb');
const connect = require('./shared/connect');

exports.handler = async function (event, context) {
    const q = faunadb.query;
    const data = JSON.parse(event.body);
    return connect
        .query(q.Call(q.Function("orderPaid"), data.id), ((ret) => { return { id: data.id } }));
};