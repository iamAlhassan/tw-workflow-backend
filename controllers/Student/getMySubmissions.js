const { failureResponse, successResponse } = require('../../utils/responseSchema');
const statusCodes = require('../../utils/statusCode.json');
const GetMySubmissions = require('../../logic/Student/GetMySubmissions');

const getMySubmissions = async (req, res) => {
    try {
        const studentId = req.headers['id'];

        let result = await GetMySubmissions(studentId).catch(error => {
            let failure = failureResponse(statusCodes.BAD_REQUEST.status, error, statusCodes.BAD_REQUEST.statusCode)
            res.status(failure.statusCode).send(failure.body)
        })
        if (result) {
            let success = successResponse(result, statusCodes.OK.statusCode)
            res.status(success.statusCode).send(success.body)
        }

    } catch (error) {
        let failure = failureResponse(statusCodes.INTERNAL_SERVER_ERROR.status, error.message, statusCodes.INTERNAL_SERVER_ERROR.statusCode)
        res.status(failure.statusCode).send(failure.body)
    }
}

module.exports = getMySubmissions
