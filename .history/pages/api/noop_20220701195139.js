export default async function handler(req, res) {
    res.status(200).end("noop");
}

export const config = {
    api: {
        bodyParser: {
            // json: {limit: '50mb', extended: true},
            urlencoded: {limit: '50mb', extended: true} 
        },
    },
}

// var bodyParser = require('body-parser');

// app.use(bodyParser.urlencoded({
// parameterLimit: 100000,
// limit: '50mb',
// extended: true
// }));