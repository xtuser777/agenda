const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: { type: String, require: true },
    description: String
});

const model = mongoose.model('Home', schema);

class Home {

}

module.exports = Home;