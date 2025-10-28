const Assignment = require('../../helpers/mongoSchema/Assignment');
const Submission = require('../../helpers/mongoSchema/Submission');

async function submitAssignment(assignmentId, answer, studentId) {
    return new Promise(async (resolve, reject) => {
        try {
            if (!answer || answer.trim().length === 0) {
                reject('Answer is required');
                return;
            }

            const assignment = await Assignment.findById(assignmentId);
            
            if (!assignment) {
                reject('Assignment not found');
                return;
            }

            if (assignment.status !== 'published') {
                reject('Assignment is not available for submission');
                return;
            }

            const existingSubmission = await Submission.findOne({
                assignmentId,
                studentId
            });

            if (existingSubmission) {
                existingSubmission.answer = answer;
                existingSubmission.submittedAt = Date.now();
                await existingSubmission.save();

                resolve({ message: 'Submission updated successfully', submission: existingSubmission });
            } else {
                const submission = new Submission({
                    assignmentId,
                    studentId,
                    answer
                });

                await submission.save();
                resolve({ message: 'Assignment submitted successfully', submission });
            }
            
        } catch (error) {
            console.error('Submit assignment error:', error);
            reject("Error while submitting assignment")
        }
    })
}

module.exports = submitAssignment;
