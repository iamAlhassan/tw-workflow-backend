const { failureResponse, successResponse } = require('../../utils/responseSchema');
const statusCodes = require('../../utils/statusCode.json');
const CreateAssignment = require('../../logic/Teacher/CreateAssignment');

const createAssignment = async (req, res) => {
    try {
        const title = req.body.title;
        const description = req.body.description;
        const dueDate = req.body.dueDate;
        const teacherId = req.headers['id'];

        let result = await CreateAssignment(title, description, dueDate, teacherId).catch(error => {
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

module.exports = createAssignment
