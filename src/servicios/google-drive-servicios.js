const { google } = require('googleapis')

const drive = google.drive({
    version: 'v2',
    auth: process.env.ACCESS_TOKEN
})


async function crearCarpeta(nombre_carpeta) {
    try {
        
        const response = await drive.files.list({
            q: `mimeType='application/vnd.google-apps.folder' and name='${nombre_carpeta}'`,
            fields: 'files(id, name)',
            spaces: 'drive',
        });

        
        const files = response.data.files;
        if (files.length > 0) {
            return files[0].id;
        } else {
            
            const fileMetadata = {
                name: folderName,
                mimeType: 'application/vnd.google-apps.folder',
            };
            const file = drive.files.create({
                resource: fileMetadata,
                fields: 'id',
            });
            return file.data.id;
        }
    } catch (error) {
        console.error('Error verificando o creando carpeta:', error);
        throw error;
    }
}

module.exports = {
    crearCarpeta
}