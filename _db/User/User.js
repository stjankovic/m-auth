const mongoose = require('mongoose');

const KSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    username: String,
    password: String,
    date: {type: Date, default: Date.now}
})

mongoose.model('Korisnik', KSchema)

module.exports = mongoose.model('Korisnik');
