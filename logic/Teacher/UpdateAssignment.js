const Assignment = require('../../helpers/mongoSchema/Assignment');

async function updateAssignment(assignmentId, updateData, teacherId) {
    return new Promise(async (resolve, reject) => {
        try {
            const assignment = await Assignment.findById(assignmentId);
            
            if (!assignment) {
                reject('Assignment not found');
                return;
            }

            if (assignment.createdBy.toString() !== teacherId) {
                reject('You can only update your own assignments');
                return;
            }

            if (updateData.title) assignment.title = updateData.title;
            if (updateData.description) assignment.description = updateData.description;
            if (updateData.dueDate !== undefined) assignment.dueDate = updateData.dueDate;
            if (updateData.status) assignment.status = updateData.status;

            await assignment.save();
            resolve({ assignment });
            
        } catch (error) {
            console.error('Update assignment error:', error);
            reject("Error while updating assignment")
        }
    })
}

module.exports = updateAssignment;
