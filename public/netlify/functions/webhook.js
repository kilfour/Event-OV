const { createMollieClient } = require('@mollie/api-client');
const faunadb = require('faunadb');
const connect = require('./shared/connect');
const Nodemailer = require("nodemailer");
const { MailtrapTransport } = require("mailtrap");


exports.handler = async function (event, context) {
    try {
        const q = faunadb.query;
        const mollieClient = createMollieClient({ apiKey: 'live_7nuWz7gkkpvSERdUp7P25ActcrwGsx' });
        //const mollieClient = createMollieClient({ apiKey: 'test_zPhwMGNRwTThJxUwGR9n4fJHtUVUaU' });
        const mollieId = event.body.split("=")[1];
        const payment = await mollieClient.payments.get(mollieId);
        const orderId = payment.description;
        if (payment.status === 'paid') {
            const result = await connect
                .query(q.Call(q.Function("orderPaid"), orderId), ((ret) => ret));
            const data = JSON.parse(result.body);
            const url = "https://pequivents.netlify.app/tickets/" + data.id + "-" + data.code
            const TOKEN = process.env.MAILTRAP_KEY;
            const transport = Nodemailer.createTransport(
                MailtrapTransport({
                    token: TOKEN,
                })
            );
            const sender = {
                address: "mailtrap@pequivents.com",
                name: "Pequivents",
            };
            const recipients = [
                data.email,
            ];
            await transport.sendMail({
                from: sender,
                to: recipients,
                subject: "Your Tickets",
                category: "Ticketing",
                text:
                    "Beste,\n\n" +
                    "Hartelijk dank voor je bestelling.\n\n" +
                    "Hieronder vind u een link naar de aangekochte tickets. U kan deze afdrukken, bewaren als pdf (via 'Print to Pdf'), of u kan ook deze pagina rechtstreeks gebruiken als toegang op het event.\n\n" +
                    "Bestelnummer: " + data.id + "\n" +
                    "Totaal in €: " + data.total + "\n" +
                    "Toon uw tickets: " + url + "\n\n" +
                    "Met vriendelijke groeten,\n" +
                    "Pequivents",
                html:
                    "<p>Beste,</p> " +
                    "<p>Hartelijk dank voor je bestelling.</p>" +
                    "<p>Hieronder vind u een link naar de aangekochte tickets. <br/>U kan deze afdrukken, bewaren als pdf (via 'Print to Pdf'), of u kan ook deze pagina rechtstreeks gebruiken als toegang op het event.</p>" +
                    "<p>" +
                    "    <ul>" +
                    "        <li>Bestelnummer : " + data.id + "</li>" +
                    "        <li>Totaal in € : " + data.total + "</li>" +
                    "        <li>" +
                    "            <a href='" + url + "'>Toon uw tickets</a>" +
                    "        </li>" +
                    "    </ul>" +
                    "</p>" +
                    "<p>Met vriendelijke groeten,</p>" +
                    "<p>Pequivents</p>"
            });
        } else {
            const res = await connect
                .query(q.Update(q.Ref(q.Collection('Order'), orderId), { code: 'FAILED' })
                    , (ret) => ret);
        }
        return {
            statusCode: 200,
            body: ""
        }
    } catch (err) {
        console.error(
            'Error: %s: %s',
            err.name,
            err.message
        );
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: `${err}`
            })
        }
    }
};
