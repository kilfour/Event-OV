import createMollieClient from '@mollie/api-client';

exports.handler = async function (event, context) {

    try {

        const data = JSON.parse(event.body);
        console.log(event.body);

        const mollieClient = createMollieClient({ apiKey: 'test_zPhwMGNRwTThJxUwGR9n4fJHtUVUaU' });
        const payment = await mollieClient.payments.create({
            amount: {
                currency: 'EUR',
                value: '0.01'//data.amount, // You must send the correct number of decimals, thus we enforce the use of strings
            },
            description: data.orderId,
            redirectUrl: 'https://pequivents.netlify.app/payment/' + data.orderId,
            // webhookUrl: 'https://webshop.example.org/payments/webhook/',

        });
        //console.log(payment);
        var url = payment.getCheckoutUrl();
        console.log(url);
        return {
            statusCode: 200,
            body: url
        }
    } catch (err) {
        console.error(
            'Error: %s: %s',
            err.name,
            err.message
        );
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: `Failed to fetch. ${err}`
            })
        }
    }
}