const applicationService = require("../services/solicitudesServicios")

const createApplication = async (req, res) => {
    let resultCode = 500;
    let responseMesage = "Application not created";

    try{
        const newApplication = req.body;

        resultCode = await applicationService.createApplication(newApplication);
        responseMesage = "Application created succesfully";
    } catch(error){
        print(`Error in createApplication Controller: ${error}`);
    }

    return res.status(resultCode).json({
        code: resultCode,
        msg: responseMesage
    });
}


const getApplications = async (req, res) => {
    let resultCode = 500
    let responseMessage = "Applications not recovered"
    let response = []

    try{
        response = await applicationService.getApplications()

        if(response !== null){
            resultCode = 200
            responseMessage = "Applications recovered succesfully"
        }
    } catch(error){
        print(`Error in getApplications Controller: ${error}`);
    }

    return res.status(resultCode).json({
        code: resultCode,
        msg: responseMessage,
        response
    });
}

module.exports = {
    createApplication,
    getApplications
}