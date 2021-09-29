require('dotenv').config()
require('./config/dbConection')

const generatedClient = require('./client/client');

module.exports = { generatedClient }

require('./events/messageCreate');
