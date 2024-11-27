const faunadb = require('faunadb');
const connect = require('../shared/connect');

exports.handler = async function (event, context) {
    const q = faunadb.query;
    const data = JSON.parse(event.body)
    const orderId = data.orderId;
    const payload = {
        data: {
            invoiceInfo: {
                companyName: data.companyName,
                vatNumber: data.vatNumber,
                address: data.address
            }
        }
    };

    return connect
        .query(q.Update(q.Ref(q.Collection('Order'), orderId), payload)
            , (ret) => { return ({ id: ret.ref.id }) });
};

