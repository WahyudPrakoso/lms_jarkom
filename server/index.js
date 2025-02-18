const express = require('express');
const cors = require("cors");
var { createServer } = require('http');
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const app = express();
const httpServer = createServer(app);
dotenv.config().parsed;

// const db = require('./config/database.js')
// async () => {
//     await db.sync({force : true})
// }
//model
const user = require('./model/usermodel.js');
const soal = require('./model/soalmodel.js');
const vidmateri = require('./model/vidmaterimodel.js');
const useranswer = require('./model/useranswermodel.js');
const materi = require('./model/materimodel.js');
//routes
const UserRoute = require("./router/userrouter.js");
const MateriRoute = require("./router/materirouter.js");
const VidMateriRoute = require("./router/vidmaterirouter.js");
const SoalRoute = require("./router/soalrouter.js");
const UserAnswer = require("./router/useranswerrouter.js");

//frontend address allowed in cors
var whitelist = [process.env.CORS_ORIGIN_LOCAL, process.env.CORS_ORIGIN_WEB]
var corsOptions = {
    credentials: true,
    origin: function (origin, callback) {
        if (!origin) {//for bypassing postman req with  no origin
            return callback(null, true);
        }
        else if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('origin ' + origin + 'Not allowed by CORS'))
        }
    }
}

app.use(cors(corsOptions));
// app.use(cors({
//     'Access-Control-Allow-Origin': '*'
// }));

//sync table model
user.sync();
soal.sync();
vidmateri.sync();
materi.sync();
useranswer.sync();

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
app.use(UserRoute);
app.use(MateriRoute);
app.use(VidMateriRoute);
app.use(SoalRoute);
app.use(UserAnswer);
app.use('/storage', express.static('./storage/'));
httpServer.listen(process.env.APP_PORT, () => {
    console.log('Server up and running on port ' + process.env.APP_PORT);
});

// server.setTimeout(500000)