const Nodemailer = require("nodemailer");
const { MailtrapTransport } = require("mailtrap");

exports.handler = async function (event, context) {

    const data = JSON.parse(event.body);
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

    return transport.sendMail({
        from: sender,
        to: recipients,
        subject: "Your Tickets",
        category: "Ticketing",
        text:
            "Beste,\n\n" +
            "Hartelijk dank voor je bestelling.\n\n" +
            "Hieronder vind u een link naar de aangekochte tickets. U kan deze afdrukken, bewaren als pdf (via 'Print to Pdf'), of u kan ook deze pagina rechtstreeks gebruiken als toegang op het event.\n\n" +
            "Bestelnummer: " + data.orderId + "\n" +
            "Totaal in €: " + data.total + "\n" +
            "Toon uw tickets: " + data.url + "\n\n" +
            "Met vriendelijke groeten,\n" +
            "Pequivents",
        html:
            "<p>Beste,</p> " +
            "<p>Hartelijk dank voor je bestelling.</p>" +
            "<p>Hieronder vind u een link naar de aangekochte tickets. <br/>U kan deze afdrukken, bewaren als pdf (via 'Print to Pdf'), of u kan ook deze pagina rechtstreeks gebruiken als toegang op het event.</p>" +
            "<p>" +
            "    <ul>" +
            "        <li>Bestelnummer : " + data.orderId + "</li>" +
            "        <li>Totaal in € : " + data.total + "</li>" +
            "        <li>" +
            "            <a href='" + data.url + "'>Toon uw tickets</a>" +
            "        </li>" +
            "    </ul>" +
            "</p>" +
            "<p>Met vriendelijke groeten,</p>" +
            "<p>Pequivents</p>"
    }
    ).then((ret) => {
        console.log(ret);
        return {
            statusCode: 200,
            body: JSON.stringify({ success: true })
        };
    })
        .catch((err) => {
            console.error(
                'Error: [%s] %s: %s',
                err.name,
                err.message
            );
            return {
                statusCode: 200,
                body: JSON.stringify({ message: err.message })
            }
        });
}
