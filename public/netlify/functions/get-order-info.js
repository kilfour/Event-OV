const faunadb = require('faunadb');
const connect = require('./shared/connect');

exports.handler = async function (event, context) {
    const q = faunadb.query;
    const payload = JSON.parse(event.body);
    return connect
        .query(q.Get(q.Ref(q.Collection('Order'), payload.id))
            , (ret) => {
                data = ret.data;
                data.id = ret.ref.id;
                return data;
            });
};
