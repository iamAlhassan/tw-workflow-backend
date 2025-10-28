const { failureResponse, successResponse } = require('../../utils/responseSchema');
const statusCodes = require('../../utils/statusCode.json');
const SubmitAssignment = require('../../logic/Student/SubmitAssignment');

const submitAssignment = async (req, res) => {
    try {
        const assignmentId = req.params.id;
        const answer = req.body.answer;
        const studentId = req.headers['id'];

        let result = await SubmitAssignment(assignmentId, answer, studentId).catch(error => {
            let failure = failureResponse(statusCodes.BAD_REQUEST.status, error, statusCodes.BAD_REQUEST.statusCode)
            res.status(failure.statusCode).send(failure.body)
        })
        if (result) {
            let success = successResponse(result, statusCodes.CREATED.statusCode)
            res.status(success.statusCode).send(success.body)
        }

    } catch (error) {
        let failure = failureResponse(statusCodes.INTERNAL_SERVER_ERROR.status, error.message, statusCodes.INTERNAL_SERVER_ERROR.statusCode)
        res.status(failure.statusCode).send(failure.body)
    }
}

module.exports = submitAssignment
