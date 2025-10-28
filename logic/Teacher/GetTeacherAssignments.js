const Assignment = require('../../helpers/mongoSchema/Assignment');

async function getTeacherAssignments(teacherId, status, page = 1, limit = 10) {
    return new Promise(async (resolve, reject) => {
        try {
            const filter = { createdBy: teacherId };
            if (status) {
                filter.status = status.toLowerCase();
            }

            // Calculate pagination
            const skip = (page - 1) * limit;
            
            // Get total count
            const totalCount = await Assignment.countDocuments(filter);
            
            // Get paginated assignments
            const assignments = await Assignment.find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);

            const totalPages = Math.ceil(totalCount / limit);

            resolve({ 
                assignments,
                pagination: {
                    currentPage: page,
                    totalPages,
                    totalCount,
                    limit,
                    hasNextPage: page < totalPages,
                    hasPrevPage: page > 1
                }
            });
            
        } catch (error) {
            console.error('Get teacher assignments error:', error);
            reject("Error while fetching assignments")
        }
    })
}

module.exports = getTeacherAssignments;
