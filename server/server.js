const http = require('http');
require('dotenv').config({});

// Connect to Database
const mongoose = require('mongoose');

mongoose
    .connect(
        process.env.DB_URL.replace('<PASSWORD>', process.env.DB_PASSWORD),
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => {
        console.log(`DB Connected`);
    });

// require('./models/User');
// require('./models/Question');
// require('./models/Quiz');
// require('./models/Score');
// require('./models/Submit');

const app = require('./app');

const server = http.createServer(app);

server.listen(process.env.PORT || 9090, () => {
    return console.log('Server is running');
});
