const Assignment = require('../../helpers/mongoSchema/Assignment');
const Submission = require('../../helpers/mongoSchema/Submission');

async function deleteAssignment(assignmentId, teacherId) {
    return new Promise(async (resolve, reject) => {
        try {
            const assignment = await Assignment.findById(assignmentId);
            
            if (!assignment) {
                reject('Assignment not found');
                return;
            }

            if (assignment.createdBy.toString() !== teacherId) {
                reject('You can only delete your own assignments');
                return;
            }

            // Delete all submissions related to this assignment
            await Submission.deleteMany({ assignmentId });

            // Delete the assignment
            await Assignment.findByIdAndDelete(assignmentId);

            resolve({ message: 'Assignment and related submissions deleted successfully' });
            
        } catch (error) {
            console.error('Delete assignment error:', error);
            reject("Error while deleting assignment")
        }
    })
}

module.exports = deleteAssignment;
