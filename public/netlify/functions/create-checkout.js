import fetch from 'node-fetch';

exports.handler = async function (event, context) {

    try {

        const data = JSON.parse(event.body);
        console.log(event.body);
        const postData = JSON.stringify({
            checkout_reference: data.orderId,
            amount: data.amount,
            currency: 'EUR',
            pay_to_email: process.env.SUMUP_MAIL,
            description: "EVENT AHM 07/10/24"
        });

        const result = await fetch(
            "https://api.sumup.com/v0.1/checkouts",
            {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${process.env.SUMUP_KEY}` },
                body: postData,
            }
        )
        const resultJSON = await result.json();
        console.log(resultJSON);
        return {
            statusCode: 200,
            body: JSON.stringify(resultJSON)
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