const { failureResponse, successResponse } = require('../../utils/responseSchema');
const statusCodes = require('../../utils/statusCode.json');
const GetTeacherAssignments = require('../../logic/Teacher/GetTeacherAssignments');

const getTeacherAssignments = async (req, res) => {
    try {
        const teacherId = req.headers['id'];
        const status = req.query.status;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        let result = await GetTeacherAssignments(teacherId, status, page, limit).catch(error => {
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

module.exports = getTeacherAssignments
