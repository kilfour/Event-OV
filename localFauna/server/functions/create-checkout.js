const http = require('https');

exports.handler = async function (event, context) {

    return new Promise(function (resolve, reject) {
        const data = JSON.parse(event.body);

        const postData = JSON.stringify({
            checkout_reference: data.orderId,
            amount: data.amount,
            currency: 'EUR',
            pay_to_email: 'kilfour@gmail.com',
            description: "EVENT 08/10/24"
        });

        const options = {
            hostname: 'api.sumup.com',
            path: '/v0.1/checkouts',
            method: 'POST',
            headers: {
                'Authorization': 'Bearer sup_sk_3TqMBrcALSosC6gL5MtVooek1de8ugNbU',
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        var req = http.request(options, function (res) {
            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=' + res.statusCode));
            }

            var body = [];
            res.on('data', function (chunk) {
                body.push(chunk);
            });

            var returnData = {}
            res.on('end', function () {
                try {
                    var responseDataAsJson = JSON.parse(Buffer.concat(body).toString());
                    returnData = { id: responseDataAsJson.id };
                } catch (e) {
                    reject(e);
                }
                resolve(returnData);
            });
        });

        req.on('error', function (err) {
            reject(err);
        });

        if (postData) {
            req.write(postData);
        }

        req.end();
    });

}