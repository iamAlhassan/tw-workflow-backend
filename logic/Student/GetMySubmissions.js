const Submission = require('../../helpers/mongoSchema/Submission');

async function getMySubmissions(studentId) {
    return new Promise(async (resolve, reject) => {
        try {
            const submissions = await Submission.find({ studentId })
                .populate('assignmentId', 'title description dueDate')
                .sort({ submittedAt: -1 });

            resolve({ count: submissions.length, submissions });
            
        } catch (error) {
            console.error('Get my submissions error:', error);
            reject("Error while fetching submissions")
        }
    })
}

module.exports = getMySubmissions;
