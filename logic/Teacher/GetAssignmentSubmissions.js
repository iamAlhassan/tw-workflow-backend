const Assignment = require('../../helpers/mongoSchema/Assignment');
const Submission = require('../../helpers/mongoSchema/Submission');

async function getAssignmentSubmissions(assignmentId, teacherId) {
    return new Promise(async (resolve, reject) => {
        try {
            const assignment = await Assignment.findById(assignmentId);
            
            if (!assignment) {
                reject('Assignment not found');
                return;
            }

            if (assignment.createdBy.toString() !== teacherId) {
                reject('You can only view submissions for your own assignments');
                return;
            }

            const submissions = await Submission.find({ assignmentId })
                .populate('studentId', 'name email')
                .sort({ submittedAt: -1 });

            resolve({ count: submissions.length, submissions });
            
        } catch (error) {
            console.error('Get submissions error:', error);
            reject("Error while fetching submissions")
        }
    })
}

module.exports = getAssignmentSubmissions;
