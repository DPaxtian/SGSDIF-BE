const mongoose = require("mongoose");

const dbUser = process.env.DB_USER;
const dbPwd = process.env.DB_PWD;
const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;

const DBURI = `mongodb+srv://${dbUser}:${dbPwd}@${dbHost}/${dbName}`;

const connect = () => {
    mongoose.connect(DBURI)
        .then(() => {
            console.log('Conectado a la base de datos');
        })
        .catch((err) => {
            console.error('Error en la base de datos!:', err);
        });
};

module.exports = () => {
    connect();
};