const fs = require('fs');
const { google } = require('googleapis');

function crearClienteDrive(clientId, clientSecret, redirectUri, refreshToken) {
    const client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
    client.setCredentials({ refresh_token: refreshToken });

    return google.drive({
        version: 'v3',
        auth: client,
    });
}


async function crearCarpeta(driveClient, folderName, parentId = null) {
    try {
        const response = await driveClient.files.create({
            resource: {
                name: folderName,
                mimeType: 'application/vnd.google-apps.folder',
                parents: parentId ? [parentId] : [],
            },
            fields: 'id, name',
        });
        return response.data;
    } catch (error) {
        console.error('Error creating folder:', error);
        throw error;
    }
}


async function buscarCarpeta(driveClient, folderName, parentId = null) {
    try {
        const query = `mimeType='application/vnd.google-apps.folder' and name='${folderName}'` + (parentId ? ` and '${parentId}' in parents` : '');
        const response = await driveClient.files.list({
            q: query,
            fields: 'files(id, name)',
        });
        return response.data.files ? response.data.files[0] : null;
    } catch (error) {
        console.error('Error searching folder:', error);
        throw error;
    }
}



async function guardarArchivo(driveClient, fileName, filePath, fileMimeType, folderId) {
    try {
        const response = await driveClient.files.create({
            requestBody: {
                name: fileName,
                mimeType: fileMimeType,
                parents: folderId ? [folderId] : [],
            },
            media: {
                mimeType: fileMimeType,
                body: fs.createReadStream(filePath),
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error saving file:', error);
        throw error;
    }
}

module.exports = {
    crearClienteDrive,
    crearCarpeta,
    buscarCarpeta,
    guardarArchivo
}