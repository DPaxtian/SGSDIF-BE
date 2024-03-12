const application = require("../models/solicitudesModelo")

const createApplication = (newApplication) => {
    return new Promise((resolve, reject) => {
        const applicationToCreate = new application(newApplication);

        applicationToCreate.save()
        .then(() => {
            resolve(200)
        })
        .catch((error) => {
            print(`There was an error creating the employee: ${error}`);
            reject(500);
        })
    })
}


const getApplications = () => {
    let applicationsReturned = []

    return new Promise((resolve, reject) => {
        applicationsReturned = application.find
        .then((applicationsReturned) => {
            resolve(applicationsReturned)
        })
        .catch((error) => {
            print("There was an error recovering the applications")
            reject(500)
        })
    })
}


module.exports = {
    createApplication,
    getApplications
}