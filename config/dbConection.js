const mongoose = require('mongoose')

const {
    NODE_ENV,
    MONGO_DB_URI,
    MONGO_DB_URI_DEV
} = process.env

const connectionString = NODE_ENV === 'production'
    ? MONGO_DB_URI
    : MONGO_DB_URI_DEV

mongoose.connect(connectionString, { useNewUrlParser: true })

const db = mongoose.connection
db.once('open', _ => {
    console.log('Database connected:')
})

db.on('error', err => {
    console.error('connection error:', err)
})