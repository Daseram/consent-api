
const fs = require('fs');

let savedConsents = [];

const loadDB = () => {

    try {
        savedConsents = require('../db/data.json');
    } catch (error) {
        savedConsents = [];
    }

}

const saveDB = () => {

    let data = JSON.stringify(savedConsents);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('An error has ocurred saving the db', err);
    });

}

const getConsents = () => {
    loadDB();
    return savedConsents;
}

const saveConsent = (consent) => {

    loadDB();

    savedConsents.push(consent);

    saveDB();

    return savedConsents;

}

module.exports = {
    getConsents,
    saveConsent
}