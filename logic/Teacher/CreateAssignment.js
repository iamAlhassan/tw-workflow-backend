const Assignment = require('../../helpers/mongoSchema/Assignment');

async function createAssignment(title, description, dueDate, teacherId) {
    return new Promise(async (resolve, reject) => {
        try {
            if (!title || !description) {
                reject('Title and description are required');
                return;
            }

            const assignment = new Assignment({
                title,
                description,
                dueDate: dueDate || null,
                createdBy: teacherId,
                status: 'draft'
            });

            await assignment.save();
            resolve({ assignment });
            
        } catch (error) {
            console.error('Create assignment error:', error);
            reject("Error while creating assignment")
        }
    })
}

module.exports = createAssignment;
