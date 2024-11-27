const Nodemailer = require("nodemailer");
const { MailtrapTransport } = require("mailtrap");

const TOKEN = "eb8fc517bf00d65f35ce7709e34d1a92";

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
    "kilfour@gmail.com",
];

transport
    .sendMail({
        from: sender,
        to: recipients,
        subject: "Your Tickets",
        // template_uuid: "9f9ef1ff-0d53-42b3-a185-7a139efe910b",
        // template_variables: {
        //     "orderId": "408779316004913355",
        //     "total": "0",
        //     "url": "https://pequivents.netlify.app/tickets/408779316004913355-42"
        html =
        "<p>Beste,</p> " +
        "<p>Hartelijk dank voor je bestelling.</p>" +
        "<p>Hieronder vind u een link naar de aangekochte tickets. <br/>U kan deze afdrukken, bewaren als pdf (via 'Print to Pdf'), of u kan ook deze pagina rechtstreeks gebruiken als toegang op het event.</p>" +
        "<p>" +
        "    <ul>" +
        "        <li>Bestelnummer : {{orderId}}</li>" +
        //"        <li>Totaal in € : {{total}}</li>" +
        "        <li>" +
        "            <a href='{{ url }}'>Toon uw tickets</a>" +
        "        </li>" +
        "    </ul>" +
        "</p>" +
        "<p>Met vriendelijke groeten,</p>" +
        "<p>Pequivents</p>"
    }
    })
    .then(console.log, console.error);