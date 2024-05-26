const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');


const envPath = path.join(__dirname, '..', '..', '.env');

const authClient = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET
);

authClient.setCredentials({
    access_token: process.env.ACCESS_TOKEN,
    refresh_token: process.env.REFRESH_TOKEN,
    expiry_date: process.env.EXPIRY_DATE
});


async function verificarExpiracionToken() {
    
    const ahora = Date.now();

    if (authClient.credentials.expiry_date - ahora < 5 * 60 * 1000) {
        console.log('Actualizando el token de acceso...');

        const { credentials } = await authClient.refreshAccessToken();

        let envContenido = fs.readFileSync(envPath, 'utf-8');
        envContenido = envContenido.replace(/ACCESS_TOKEN=.*/, `ACCESS_TOKEN=${credentials.access_token}`);
        envContenido = envContenido.replace(/EXPIRY_DATE=.*/, `EXPIRY_DATE=${credentials.expiry_date}`);
        fs.writeFileSync(envPath, envContenido, 'utf-8');

        authClient.setCredentials(credentials);
        
        console.log('Token de acceso actualizado.');
    } else {
        console.log('El token de acceso todavía es válido.');
    }

    setTimeout(verificarExpiracionToken, 10 * 60 * 1000); // 10 minutos
}

module.exports = {
    verificarExpiracionToken
}
