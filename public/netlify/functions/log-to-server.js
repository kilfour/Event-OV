
exports.handler = async function (event, context) {

    try {

        const data = JSON.parse(event.body);
        console.log(data.message);
        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true
            })
        }

    } catch (err) {
        return {
            statusCode: 200,
            body: JSON.stringify({
                success: false
            })
        }
    }
}