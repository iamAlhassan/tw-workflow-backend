const { failureResponse, successResponse } = require('../../utils/responseSchema');
const statusCodes = require('../../utils/statusCode.json');
const UpdateAssignment = require('../../logic/Teacher/UpdateAssignment');

const updateAssignment = async (req, res) => {
    try {
        const assignmentId = req.params.id;
        const updateData = {
            title: req.body.title,
            description: req.body.description,
            dueDate: req.body.dueDate,
            status: req.body.status
        };
        const teacherId = req.headers['id'];

        let result = await UpdateAssignment(assignmentId, updateData, teacherId).catch(error => {
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

module.exports = updateAssignment
