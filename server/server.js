require('./config/config');
const consent = require('../consent/consent');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get('/consents', function(req, res) {
    let consents = consent.getConsents();
    res.json({
        ok: true,
        consents: consents
    });
});

app.post('/consent', function(req, res) {

    let body = req.body;

    if (!body.name || !body.email || body.consent.lenght === 0) {

        res.status(400).json({
            ok: false,
            mensaje: 'All fields are required'
        });

    } else {
        consent.saveConsent(body);
        res.json({
            ok: true,
            consent: body.consent
        });
    }

});

app.listen(process.env.PORT, () => {
    console.log('Listen Port: ', process.env.PORT);
});