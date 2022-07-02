export default async function handler(req, res) {
    res.status(200).end("noop");
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: "50mb",
        },
    },
};

// var bodyParser = require('body-parser');

// app.use(bodyParser.urlencoded({
// parameterLimit: 100000,
// limit: '50mb',
// extended: true
// }));