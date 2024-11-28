import createMollieClient from '@mollie/api-client';

exports.handler = async function (event, context) {

    try {

        const data = JSON.parse(event.body);
        console.log(event.body);

        const mollieClient = createMollieClient({ apiKey: 'test_zPhwMGNRwTThJxUwGR9n4fJHtUVUaU' });

        (async () => {

            const payment = await mollieClient.payments.create({
                amount: {
                    currency: 'EUR',
                    value: String(data.amount), // You must send the correct number of decimals, thus we enforce the use of strings
                },
                description: 'EVENT OM 09/10/25',
                redirectUrl: 'https://pequivents.netlify.app/payment/' + data.orderId + '/',
                // webhookUrl: 'https://webshop.example.org/payments/webhook/',
                metadata: {
                    order_id: data.orderId,
                },
            });

            console.log(payment);

        })();
        return {
            statusCode: 200,
            body: JSON.stringify(payment.getCheckoutUrl())
        }
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: `Failed to fetch. ${err}`
            })
        }
    }
}