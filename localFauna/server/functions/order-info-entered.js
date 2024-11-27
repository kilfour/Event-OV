const faunadb = require('faunadb');
const connect = require('../shared/connect');

exports.handler = async function (event, context) {
    const q = faunadb.query;
    const data = JSON.parse(event.body)
    const payload = {
        data: data
    }
    return connect
        .query(q.Create(q.Collection('Order'), payload)
            , (ret) => { return ({ id: ret.ref.id }) });
};
