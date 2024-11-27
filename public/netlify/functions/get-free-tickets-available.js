const faunadb = require('faunadb');
const connect = require('./shared/connect');

const docId = "408775435213603019";

exports.handler = async function (event, context) {
    const q = faunadb.query;
    return connect
        .query(q.Get(q.Ref(q.Collection('FreeTickets'), docId))
            , (ret) => {
                console.log(ret)
                return { amount: ret.data.amount };
            });
};